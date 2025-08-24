import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    firstName: string;

    @Column({ type: DataType.STRING, allowNull: false })
    lastName: string;

    @Column({ type: DataType.ENUM('male', 'female', 'other'), allowNull: false })
    gender: string;

    @Column({ type: DataType.DATEONLY, allowNull: false })
    birthday: Date;

    @Column({ type: DataType.STRING, allowNull: false })
    address1: string;

    @Column({ type: DataType.STRING, allowNull: true })
    address2: string;

    @Column({ type: DataType.STRING, allowNull: false })
    city: string;

    @Column({ type: DataType.STRING, allowNull: false })
    country: string;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;
}
