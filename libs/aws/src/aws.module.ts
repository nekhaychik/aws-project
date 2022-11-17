import { Global, Module } from '@nestjs/common';

import { AwsService } from './application';
import { AWS_MODULE_OPTIONS_TOKEN } from './core';

@Global()
@Module({
  exports: [AwsService],
  providers: [AwsService],
})
export class AwsModule {
  public static registerAsync(options) {
    return {
      imports: options.imports || [],
      module: AwsModule,
      providers: this.createAsyncProviders(options),
    };
  }

  private static createAsyncProviders(options) {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options) {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: AWS_MODULE_OPTIONS_TOKEN,
        useFactory: options.useFactory,
      };
    }

    return {
      inject: [options.useExisting || options.useClass],
      provide: AWS_MODULE_OPTIONS_TOKEN,
      useFactory: async (optionsFactory) => optionsFactory.createAwsOptions(),
    };
  }
}
