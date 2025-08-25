import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
    tableName: 'app_performance_logs',
    timestamps: true,
})
export class SuperObserve extends Model<SuperObserve> {
    @Column({ type: DataType.STRING, allowNull: false })
    route: string;

    @Column({ type: DataType.DATE, allowNull: false })
    beforeTime: Date;

    @Column({ type: DataType.DATE, allowNull: false })
    afterTime: Date;

    @Column({ type: DataType.FLOAT, allowNull: false })
    computedSpeed: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    responseStatus: number;

    @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
    loggedAt: Date;
}
