import { Admin } from "src/admin/entities/admin.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    category: string

    @Column()
    content: string

    @Column()
    summary: string

    @Column()
    rating: number

    @Column()
    cover: string

    @ManyToOne(() => Admin, (admin) => admin.reviews, {
        nullable: false
    })
    author: Admin

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
