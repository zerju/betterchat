import { WebsocketService } from '../core/services/websocket.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LayoutComponent } from './layout/layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ChatScreenComponent } from './chat-screen/chat-screen.component';
import { ChatToolbarComponent } from './chat-toolbar/chat-toolbar.component';
import { ChatInputBoxComponent } from './chat-input-box/chat-input-box.component';
import { MessagesComponent } from './messages/messages.component';
import { DirectivesModule } from './../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { LoggedOutToolbarComponent } from './logged-out-toolbar/logged-out-toolbar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { FriendListItemComponent } from './friend-list-item/friend-list-item.component';
import { SpinnerComponent } from './spinner/spinner.component';

const COMPONENTS: any[] = [
  ToolbarComponent,
  LayoutComponent,
  ContactListComponent,
  ChatScreenComponent,
  ChatToolbarComponent,
  ChatInputBoxComponent,
  MessagesComponent,
  LoggedOutToolbarComponent,
  ProfileModalComponent,
  ImageUploadComponent,
  AddFriendComponent,
  FriendListItemComponent
];

@NgModule({
  declarations: [COMPONENTS, SpinnerComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    DirectivesModule,
    PipesModule,
    MatTooltipModule,
    MatMenuModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ProfileModalComponent, ImageUploadComponent, AddFriendComponent],
  exports: [COMPONENTS],
  providers: [WebsocketService]
})
export class ComponentsModule {}
