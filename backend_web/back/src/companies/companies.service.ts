import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { Match } from './match.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(Match) private matchRepository: Repository<Match>,
  ) {}

  async findAll(
    limit = 1000,
    page = 1,
  ): Promise<{ result: Company[]; hasMore: boolean }> {
    let hasMore = false;
    const companies = await this.companyRepository.find({
      skip: (page - 1) * limit,
      take: limit + 1,
    });
    if (companies.length > limit) {
      hasMore = true;
    }
    return {
      result: companies.slice(0, Math.min(companies.length, limit)),
      hasMore,
    };
  }

  async findOne(id: number) {
    return this.companyRepository.findOne(id);
  }

  async countAll() {
    return this.companyRepository.count();
  }

  async getMatches(id: number) {
    const matches = (
      await this.matchRepository.find({
        where: [{ left_company_id: id }, { right_company_id: id }],
      })
    ).map(m => {
      return m.left_company_id === id ? m.right_company_id : m.left_company_id;
    });

    return this.companyRepository.find({ where: { id: [matches] } });
  }
}
