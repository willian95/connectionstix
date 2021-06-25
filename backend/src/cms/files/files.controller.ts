import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path'

@Controller('files')
export class FilesController {

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file',
        {
            storage: diskStorage({
            destination: './uploads', 
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
            })
        })
    )
    uploadAvatar(@UploadedFile() file) {
      return file.filename
    }

}
