import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Pigu123456',
      database: 'inbound',
      entities: [User],
      autoLoadEntities: true,
      synchronize: true, // Automatically sync schema (good for development)
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
