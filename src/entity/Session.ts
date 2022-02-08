import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  sessionId: string

  @Column()
  server: number

  @Column()
  username: string

  @Column()
  app: string

  @Column()
  created: string

  @Column()
  referer: string

  @Column()
  userAgent: string

  @Column()
  clientIpAddress: string

  @Column()
  failure: boolean
}
