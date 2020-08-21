import { Component, OnInit} from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from '../_services';
import { Fitness } from '../modals/Fitness';
import { ActivatedRoute, Router } from '@angular/router';
export * from '../modals/Fitness';

@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html'
  
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {

  fitnessForm: FormGroup;
  editflag: boolean;
  loadingComplete= false;

  constructor(private fb: FormBuilder,
    private userservice: UserService,
    private router: Router,
    private route:ActivatedRoute
    ) {}
  


    ngOnInit() {
      if (this.route.snapshot.paramMap.get("id")) {
        this.editflag = true;
        this.userservice
          .getfitnessdatabyid(this.route.snapshot.paramMap.get("id"))
          .subscribe((user) => {
            this.loadingComplete = true;
            this.fitnessForm = this.fb.group({
              firstname: [user.firstname, [Validators.required]],
              lastname: [user.lastname, [Validators.required]],
              phonenumber: [user.phonenumber, [Validators.required]],
              email: [
                user.email,
                [
                  Validators.required,
                  Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
                ],
              ],
              age: [
                user.age,
                [Validators.required, Validators.min(18), Validators.max(60)],
              ],
              trainerpreference: [user.trainerpreference, [Validators.required]],
              physiotherapist: [user.physiotherapist, [Validators.required]],
              packages: [user.packages, [Validators.required]],
              inr: [user.inr, [Validators.required]],
              paisa: [user.paisa, [Validators.required, Validators.max(99)]],
              streetaddress: [user.streetaddress, [Validators.required]],
              city: [user.city, [Validators.required]],
              state: [user.state, [Validators.required]],
              country: [user.country, [Validators.required]],
              pincode: [
                user.pincode,
                [Validators.required, Validators.pattern("^[0-9]{6}$")],
              ],
            });
          });
      } else {
        this.editflag = false;
        this.loadingComplete = true;
  
        this.fitnessForm = this.fb.group({
          firstname: ["", 
          Validators.compose([
            Validators.required,
            Validators.pattern("^[A-Za-z]+$"),
          ])
        ],
          lastname: ["", 
          Validators.compose([
            Validators.required,
            Validators.pattern("^[A-Za-z]+$"),
          ])
        ],
          phonenumber: ["", [Validators.required]],
          email: [
            "",
            Validators.compose([
              Validators.required,
              Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
            ])
          ],
          age: [
            "",
            Validators.compose([Validators.required, Validators.min(18), Validators.max(60)]),
          ],
          trainerpreference: ["", [Validators.required]],
          physiotherapist: ["", [Validators.required]],
          packages: ["", [Validators.required]],
          inr: ["", [Validators.required]],
          paisa: ["", [Validators.required]],
  
          streetaddress: ["", [Validators.required]],
          city: ["", [Validators.required]],
          state: ["", [Validators.required]],
          country: ["", [Validators.required]],
          pincode: ["", Validators.compose([Validators.required, Validators.pattern("^[0-9]{6}$")])],
        });
      }
    }
  
  
  
onSubmit() {
  this.fitnessForm.value;
  console.log(
    "LOG: LoginComponent -> onSubmit -> this.fitnessForm.value",
    this.fitnessForm.value
  );

  if (this.fitnessForm.valid) {
    console.log("success");

    const data = new Fitness(
      this.fitnessForm.value.inr,
      this.fitnessForm.value.paisa,
      this.fitnessForm.value.streetaddress,
      this.fitnessForm.value.city,
      this.fitnessForm.value.state,
      this.fitnessForm.value.country,
      this.fitnessForm.value.pincode,
      this.fitnessForm.value.phonenumber,
      this.fitnessForm.value.email,
      this.fitnessForm.value.firstname,
      this.fitnessForm.value.lastname,
      this.fitnessForm.value.age,
      this.fitnessForm.value.trainerpreference,
      this.fitnessForm.value.physiotherapist,
      this.fitnessForm.value.packages,
      ""
    );
    if (this.editflag) {
      this.userservice
        .editfitness(this.route.snapshot.paramMap.get("id"), data)
        .subscribe((result) => {
          this.router.navigate([
            `/view/${this.route.snapshot.paramMap.get("id")}`,
          ]);
        });
    } else {
      this.userservice
        .postfitnessdata(data.toObject())
        .subscribe((result) => {
          console.log(result);
          this.fitnessForm.reset();
        });
    }

    // console.log(this.fitnessdata);
  }
}


  

  /*
  edit(id){
    if(id){
    this.router.navigate(['/edit/${id}']);
   // console.log(frnd);
    }
  }*/
    
}
