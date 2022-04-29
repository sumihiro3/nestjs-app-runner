import { DynamooseModule } from 'nestjs-dynamoose';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DynamooseModule.forRoot({
      aws: {
        accessKeyId:
          process.env.NODE_ENV === 'development'
            ? process.env.AWS_PROFILE_ACCESS_KEY_ID
            : null,
        secretAccessKey:
          process.env.NODE_ENV === 'development'
            ? process.env.AWS_PROFILE_SECRET_ACCESS_KEY
            : null,
        region: 'ap-northeast-1',
      },
      model: {
        create: false,
        prefix: 'NestJS_AppRunner_',
      },
      logger: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
console.log(`REGION`, process.env.AWS_PROFILE_REGION);
