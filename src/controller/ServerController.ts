import { getRepository } from "typeorm"
import { NextFunction, Request, Response } from "express"
import { Server } from "../entity/Server"

export class LdapServerController {
  // TypeORM's getRepository uses an Entity from ../entities to create a controller
  // based on a type.
  private ldapServerRepository = getRepository(Server)

  async all(request: Request, response: Response, next: NextFunction) {
    return this.ldapServerRepository.find()
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.ldapServerRepository.findOne(request.params.id)
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.ldapServerRepository.save(request.body)
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let serverToRemove = await this.ldapServerRepository.findOne(request.params.id)
    await this.ldapServerRepository.remove(serverToRemove)
  }
}