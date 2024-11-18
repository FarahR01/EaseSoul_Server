import { Routes } from '@angular/router';
import { IndexOneComponent } from './pages/index/index-one/index-one.component';
import { IndexThreeComponent } from './pages/index/index-three/index-three.component';
import { IndexFourComponent } from './pages/index/index-four/index-four.component';
import { IndexFiveComponent } from './pages/index/index-five/index-five.component';
import { ExploreOneComponent } from './pages/explore/explore-one/explore-one.component';
import { ExploreTwoComponent } from './pages/explore/explore-two/explore-two.component';
import { ExploreThreeComponent } from './pages/explore/explore-three/explore-three.component';
import { ExploreFourComponent } from './pages/explore/explore-four/explore-four.component';
import { AuctionComponent } from './pages/explore/auction/auction.component';
import { ItemDetailOneComponent } from './pages/explore/item-detail-one/item-detail-one.component';
import { ItemDetailTwoComponent } from './pages/explore/item-detail-two/item-detail-two.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { CreatorsComponent } from './pages/creator/creators/creators.component';
import { CreatorProfileComponent } from './pages/creator/creator-profile/creator-profile.component';
import { CreatorProfileEditComponent } from './pages/creator/creator-profile-edit/creator-profile-edit.component';
import { BecomeCreatorComponent } from './pages/creator/become-creator/become-creator.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { BlogsComponent } from './pages/blog/blogs/blogs.component';
import { BlogSidebarComponent } from './pages/blog/blog-sidebar/blog-sidebar.component';
import { BlogDetailComponent } from './pages/blog/blog-detail/blog-detail.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { LockScreenComponent } from './pages/auth/lock-screen/lock-screen.component';
import { ComingsoonComponent } from './pages/special/comingsoon/comingsoon.component';
import { MaintenanceComponent } from './pages/special/maintenance/maintenance.component';
import { ErrorComponent } from './pages/special/error/error.component';
import { HelpcenterOverviewComponent } from './pages/helpcenter/helpcenter-overview/helpcenter-overview.component';
import { HelpcenterFaqsComponent } from './pages/helpcenter/helpcenter-faqs/helpcenter-faqs.component';
import { HelpcenterGuidesComponent } from './pages/helpcenter/helpcenter-guides/helpcenter-guides.component';
import { HelpcenterSupportRequestComponent } from './pages/helpcenter/helpcenter-support-request/helpcenter-support-request.component';
import { UploadWorkComponent } from './pages/upload-work/upload-work.component';
import { TermsComponent } from './pages/terms/terms.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
    {path:'', component:IndexOneComponent},
    {path:'index-three', component:IndexThreeComponent},
    {path:'index-four', component:IndexFourComponent},
    {path:'index-five', component:IndexFiveComponent},
    {path:'explore-one', component:ExploreOneComponent},
    {path:'explore-two', component:ExploreTwoComponent},
    {path:'explore-three', component:ExploreThreeComponent},
    {path:'explore-four', component:ExploreFourComponent},
    {path:'auction', component:AuctionComponent},
    {path:'item-detail-one', component:ItemDetailOneComponent},
    {path:'item-detail-one/:id', component:ItemDetailOneComponent},
    {path:'item-detail-two', component:ItemDetailTwoComponent},
    {path:'activity', component:ActivityComponent},
    {path:'wallet', component:WalletComponent},
    {path:'aboutus', component:AboutusComponent},
    {path:'creators', component:CreatorsComponent},
    {path:'creator-profile', component:CreatorProfileComponent},
    {path:'creator-profile-edit', component:CreatorProfileEditComponent},
    {path:'become-creator', component:BecomeCreatorComponent},
    {path:'collections', component:CollectionsComponent},
    {path:'blogs', component:BlogsComponent},
    {path:'blog-sidebar', component:BlogSidebarComponent},
    {path:'blog-detail', component:BlogDetailComponent},
    {path:'blog-detail/:id', component:BlogDetailComponent},
    {path:'login', component:LoginComponent},
    {path:'signup', component:SignupComponent},
    {path:'reset-password', component:ResetPasswordComponent},
    {path:'lock-screen', component:LockScreenComponent},
    {path:'comingsoon', component:ComingsoonComponent},
    {path:'maintenance', component:MaintenanceComponent},
    {path:'error', component:ErrorComponent},
    {path:'helpcenter-overview', component:HelpcenterOverviewComponent},
    {path:'helpcenter-faqs', component:HelpcenterFaqsComponent},
    {path:'helpcenter-guides', component:HelpcenterGuidesComponent},
    {path:'helpcenter-support-request', component:HelpcenterSupportRequestComponent},
    {path:'upload-work', component:UploadWorkComponent},
    {path:'terms', component:TermsComponent},
    {path:'privacy', component:PrivacyComponent},
    {path:'contact', component:ContactComponent},
];
