import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Company } from './company.entity';

@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Get()
  async findAll(
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit?: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
  ): Promise<{ result: Company[]; hasMore: boolean }> {
    return this.companiesService.findAll(limit, page);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ result: Company }> {
    const result = await this.companiesService.findOne(id);
    return { result };
  }

  @Get(':id/matches')
  async getMatches(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ result: any }> {
    return { result: await this.companiesService.getMatches(id) };
  }
}
