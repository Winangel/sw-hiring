import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { Match } from './match.entity';
export declare class CompaniesService {
    private companyRepository;
    private matchRepository;
    constructor(companyRepository: Repository<Company>, matchRepository: Repository<Match>);
    findAll(limit?: number, page?: number): Promise<Company[]>;
    findOne(id: number): Promise<Company>;
    getMatches(id: number): Promise<Company[]>;
}
