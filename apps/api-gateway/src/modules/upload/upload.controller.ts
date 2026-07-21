import { Controller, Post, UploadedFile, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

/**
 * UploadController handles file upload endpoints.
 */
@Controller('v1/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  /**
   * Accepts multipart image upload, compresses, and stores to S3-compatible storage.
   * 
   * @param file The uploaded image file
   * @returns Object containing the resulting URL and extracted geodata
   */
  @Post('proof')
  @UseInterceptors(FileInterceptor('image'))
  async uploadProof(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.uploadService.processAndUploadProof(file);
  }
}
