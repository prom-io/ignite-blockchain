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
import {AddCommentHandler} from './useCase/addComment/addComment.handler';
import {CommentController} from './comment.controller';
import {LikeController} from './like.controller';
import {AddLikeHandler} from './useCase/addLike/addLike.handler';
import {SubscribeController} from './subscribe.controller';
import {AddSubscribeHandler} from './useCase/addSubscribe/addSubscribe.handler';
import {TasksService} from './TasksService';
import {BtfsFetcher} from './fetchers/btfs.fetcher';
// tslint:disable-next-line:no-var-requires
const https = require('https');
@Module({
  imports: [
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
  controllers: [SubscribeController, LikeController, CommentController, FileController, SoterController],
  providers: [
    BtfsFetcher,
    TasksService,
    AddSubscribeHandler,
    AddLikeHandler,
    AddCommentHandler,
    FileFetcher,
    ArchiveService,
    SoterService,
    UploadHandler,
    ArchiveHandler,
    UnzipHandler,
  ],
})
export class SoterModule {}
