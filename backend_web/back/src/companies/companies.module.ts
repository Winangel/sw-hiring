import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { Company } from './company.entity';
import { Match } from './match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Match])],
  providers: [CompaniesService],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
