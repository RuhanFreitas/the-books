import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConsoleLogger, ValidationPipe } from '@nestjs/common'
import { LoggingInterceptor } from './common/interceptors/loggin.interceptor'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.useGlobalInterceptors(new LoggingInterceptor())

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        })
    )

    const config = new DocumentBuilder()
    .setTitle('The Books')
    .setVersion('1.0')
    .build()

    const documentFactory = () => SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, documentFactory)

    await app.listen(process.env.PORT ?? 3000)
}
bootstrap();
