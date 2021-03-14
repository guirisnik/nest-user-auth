import { IsEmail, IsNotEmpty } from 'class-validator';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('User')
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ nullable: false })
  @IsNotEmpty()
  name: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  password: string;
}
