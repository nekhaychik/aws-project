import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AwsModule } from 'libs/aws/src/aws.module';
import { AwsConfigService } from './config';
import { FileModule } from './modules/file';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'), // Loaded from .ENV
      }),
    }),
    AwsModule.registerAsync({ useClass: AwsConfigService }),
    FileModule,
  ],
})
export class AppModule {}
