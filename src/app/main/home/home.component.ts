import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { WebcamInitError, WebcamUtil, WebcamImage, WebcamMirrorProperties } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { TesterService } from '../../services/tester/tester.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('largeModal') public largeModal: ModalDirective;

  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public mirrorImage: WebcamMirrorProperties
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  formVisitor: any = {};
  formData = new FormData();

  alertNotifSuccess = false;
  alertNotifNotSuccess = false;
  photo;
  checkPhone = false;
  checkEmail = false;
  private subs: Subject<void> = new Subject();
  constructor(
    private testerServ: TesterService,
    private router: Router
  ) { }

  ngOnInit() {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
      console.log(this.webcamImage);
      if(!this.webcamImage){
        // this.photo = '../../../assets/img/avatars/blank-profile-picture-973460_960_720.png'
        this.photo = 'assets/img/avatars/blank-profile-picture-973460_960_720.png'
      }
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  public triggerSnapshot(): void {
    this.trigger.next();
    this.photo = this.webcamImage.imageAsDataUrl;
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  funcCheckNumber(phoneNumber) {
    this.testerServ.checkPhoneNumber(phoneNumber)
    .pipe(takeUntil(this.subs))
    .subscribe(res => {
      if (res == 'Phone number already registered!'){
        this.checkPhone = true;
      } else {
        this.checkPhone = false;
      }
    });
  }

  checkPhoneNumber(ev){
    let evLength = +ev.length;
    switch (evLength){
      case 13:
        const data13 = {
          phoneNumber: ev
        };
        this.funcCheckNumber(data13);
        break;
      case 14:
        const data14 = {
          phoneNumber: ev
        };
        this.funcCheckNumber(data14);
        break;
    }
  }

  onSubmit() {
    if (!this.webcamImage){
      this.formVisitor.photo = 'assets/img/avatars/blank-profile-picture-973460_960_720.png'
    } else {
      this.formVisitor.photo = this.webcamImage.imageAsDataUrl;
    }
    // this.router.navigate(['/visitor/success-registered'], { skipLocationChange: true });
    this.testerServ.createVisitor(this.formVisitor).subscribe(res => {
      this.alertNotifSuccess = true;
      this.router.navigate(['/visitor/success-registered'], { skipLocationChange: true });
      setTimeout(()=>{
        this.alertNotifSuccess = false;
        this.webcamImage = null;
        this.photo = 'assets/img/avatars/blank-profile-picture-973460_960_720.png'
      }, 3000);
    }, err => {
      this.alertNotifNotSuccess = true;
      setTimeout(()=>{
        this.alertNotifNotSuccess = false;
        this.webcamImage = null;
        this.photo = 'assets/img/avatars/blank-profile-picture-973460_960_720.png'
      }, 3000);
    })   
  }


  reset(){
    this.webcamImage = null;
    this.formVisitor.photo = 'assets/img/avatars/blank-profile-picture-973460_960_720.png'
    this.photo = 'assets/img/avatars/blank-profile-picture-973460_960_720.png'
  }

  goToList(){
    this.router.navigate(['/visitor/list'], { skipLocationChange: true })
  }


}
