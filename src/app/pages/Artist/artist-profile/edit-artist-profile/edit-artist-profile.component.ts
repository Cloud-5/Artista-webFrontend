import { ImageUploadService } from './../../../../shared/services/image-upload.service';
import { Component, OnInit } from '@angular/core';
import { EditArtistProfileService } from './edit-artist-profile.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArtistNewHomeServiceService } from '../artist-new-home/artist-new-home-service.service';

@Component({
  selector: 'app-edit-artist-profile',
  templateUrl: './edit-artist-profile.component.html',
  styleUrls: ['./edit-artist-profile.component.css']
})
export class EditArtistProfileComponent implements OnInit {
  public updateDetails: any = {
    fName:'',
    LName:'',
    location:'',
    description:'',
    profile_photo_url:null,
    profession:'',

      month: '',
      day: '',
      year: ''

  };

  days: number[] = Array.from({ length: 31 }, (v, k) => k + 1);
  years: number[] = Array.from({ length: 101 }, (v, k) => new Date().getFullYear() - k);


  userData: any = {}
  profilePhoto: any;


  months: { name: string, value: number }[] = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 }
  ];

  public userId:string ='Ar-00001';



  public countries: string[] = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
    'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
    'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of the', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
    'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor (Timor-Leste)', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia',
    'Fiji', 'Finland', 'France',
    'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
    'Haiti', 'Honduras', 'Hungary',
    'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
    'Jamaica', 'Japan', 'Jordan',
    'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan',
    'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
    'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar (Burma)',
    'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway',
    'Oman',
    'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
    'Qatar',
    'Romania', 'Russia', 'Rwanda',
    'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'Spain', 'Sri Lanka', 'Sudan', 'Sudan, South', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
    'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
    'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan',
    'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
    'Yemen',
    'Zambia', 'Zimbabwe'
  ];

  routeSub: Subscription | undefined;


  constructor(private artistService: EditArtistProfileService, private ImageUploadService:ImageUploadService, private route: ActivatedRoute,private artist:ArtistNewHomeServiceService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params['userId'];
      console.log('userId',this.userId)
      this.loadArtistData(this.userId);
    });
  }

  loadArtistData(userId:string): void {
    this.artist.getArtistDetail(userId).subscribe((data: any) => {
      this.userData = data.artistData[0];
      console.log('data',this.userData)
      this.updateDetails.fName = this.userData.FName;
      this.updateDetails.LName = this.userData.LName;
      this.updateDetails.location = this.userData.location;
      this.updateDetails.description = this.userData.description;
      this.updateDetails.profession = this.userData.profession;
      this.updateDetails.profile_photo_url = this.userData.profile_photo_url;
    })
    // this.artistService.getArtistDetail(userId).subscribe((data: any) => {
    //   this.userData = data;
    //   this.updateDetails.fName = this.userData.fName;
    //   this.updateDetails.LName = this.userData.LName;
    //   this.updateDetails.location = this.userData.location;
    //   this.updateDetails.description = this.userData.description;
    //   this.updateDetails.profession = this.userData.profession;
    //   this.updateDetails.profile_photo_url = this.userData.profile_photo_url;
    // });
  }

  updateProfile(): void {
    console.log('data',this.userData);
    this.artistService.updateArtistProfile('Ar-00001', this.updateDetails).subscribe((response: any) => {
      console.log('data 2 --',this.userData);
      console.log(response.message);
    });
  }

  // onFileSelected(event: any): void {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.userData.profile_photo_url = e.target.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  cancelEdit(): void {
    alert("Edit profile cancelled.");
  }

  onFileSelected(event: any) {
    const FILE = (event.target as HTMLInputElement).files?.[0];
    this.profilePhoto = FILE;
  }

  newImageUpload() {
    const imageForm = new FormData();
    imageForm.append('image', this.profilePhoto as Blob);
    this.ImageUploadService.imageUpload(imageForm).subscribe((res:any) => {
      this.userData.ProfilePhoto = res.image.location;
    });
  }

  removeExistingImage() {
    if (this.userData.ProfilePhoto) {
      const key = this.userData.ProfilePhoto.split('/').pop();
      this.ImageUploadService.removeImage(key as any).subscribe(
        () => {
          this.userData.ProfilePhoto = '';
        },
        (error) => {
          console.log('error removing image', error);
        }
      );
    }
  }
}
