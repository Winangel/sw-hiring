"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompaniesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const company_entity_1 = require("./company.entity");
const match_entity_1 = require("./match.entity");
let CompaniesService = class CompaniesService {
    constructor(companyRepository, matchRepository) {
        this.companyRepository = companyRepository;
        this.matchRepository = matchRepository;
    }
    async findAll(limit = 1000, page = 1) {
        return this.companyRepository.find({
            skip: (page - 1) * limit,
            take: limit,
        });
    }
    async findOne(id) {
        return this.companyRepository.findOne(id);
    }
    async getMatches(id) {
        const matches = (await this.matchRepository.find({
            where: [{ left_company_id: id }, { right_company_id: id }],
        })).map(m => {
            return m.left_company_id === id ? m.right_company_id : m.left_company_id;
        });
        return this.companyRepository.find({ where: { id: [matches] } });
    }
};
CompaniesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(company_entity_1.Company)),
    __param(1, typeorm_1.InjectRepository(match_entity_1.Match)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CompaniesService);
exports.CompaniesService = CompaniesService;
//# sourceMappingURL=companies.service.js.map