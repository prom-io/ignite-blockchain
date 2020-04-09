import {HttpModule, Module} from '@nestjs/common';
import { SoterController } from './soter.controller';
import {SoterService} from './soter.service';
import {UploadHandler} from './useCase/uploadFile/uploadHandler';
import {ArchiveHandler} from './useCase/archiveFile/archiveHandler';
import {UnzipHandler} from './useCase/unzipFile/unzipHandler';
import { MulterModule } from '@nestjs/platform-express';
import {ConfigModule} from '../../config/config.module';
import {ConfigService} from '../../config/config.service';
import {ArchiveService} from './archive.service';
import {FileFetcher} from './fetchers/file.fetcher';
import {FileController} from './file.controller';
import {AddPostHandler} from './useCase/addPost/addPost.handler';
import {PostController} from './post.controller';
import {LikeController} from './like.controller';
import {AddLikeHandler} from './useCase/addLike/addLike.handler';
import {SubscribeController} from './subscribe.controller';
import {AddSubscribeHandler} from './useCase/addSubscribe/addSubscribe.handler';
import {TasksService} from './TasksService';
import {BtfsFetcher} from './fetchers/btfs.fetcher';
import {MapService} from './map.service';
import {UserController} from './user.controller';
import {AddUserHandler} from './useCase/addUser/addUser.handler';
import {UnlikeController} from './unlike.controller';
import {RemoveLikeHandler} from './useCase/removeLike/removeLike.handler';
import {UnsubscribeController} from './unsubscribe.controller';
import {RemoveSubscribeHandler} from './useCase/removeSubscribe/removeSubscribe.handler';
import {ContractModule} from '../contracts/contract.module';
import {ContractController} from './contract.controller';
import {ContractFetcher} from './fetchers/contract.fetcher';
// tslint:disable-next-line:no-var-requires
const https = require('https');
@Module({
  imports: [
      ContractModule,
      HttpModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          baseURL: configService.get('SOTER_HOST'),
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
          }),
          headers: {
            'Content-Type': 'multipart/form-data; charset=UTF-8',
          },
        }),
        inject: [ConfigService],
      }),
    // MulterModule.register({
    //   dest: './files',
    // }),
  ],
  controllers: [
    UserController,
    SubscribeController,
    LikeController,
    PostController,
    FileController,
    SoterController,
    UnlikeController,
    UnsubscribeController,
    ContractController,
  ],
  providers: [
    MapService,
    BtfsFetcher,
    TasksService,
    AddSubscribeHandler,
    AddLikeHandler,
    AddPostHandler,
    FileFetcher,
    ArchiveService,
    SoterService,
    UploadHandler,
    ArchiveHandler,
    UnzipHandler,
    AddUserHandler,
    RemoveLikeHandler,
    RemoveSubscribeHandler,
    ContractFetcher,
  ],
})
export class SoterModule {}
