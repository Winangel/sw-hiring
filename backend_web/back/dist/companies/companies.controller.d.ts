import { CompaniesService } from './companies.service';
import { Company } from './company.entity';
export declare class CompaniesController {
    private companiesService;
    constructor(companiesService: CompaniesService);
    findAll(limit?: number, page?: number): Promise<Company[]>;
    findOne(id: number): Promise<Company>;
    getMatches(id: number): any;
}
