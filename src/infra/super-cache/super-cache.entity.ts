import { Column, Model, Table, PrimaryKey, DataType } from 'sequelize-typescript';

@Table({ tableName: 'app_caches', timestamps: false })
export class SuperCache extends Model {
    @PrimaryKey
    @Column
    key!: string;

    @Column({ type: 'TEXT' })
    value!: string;

    @Column({ type: DataType.BIGINT, allowNull: true })
    expiresAt?: number;
}