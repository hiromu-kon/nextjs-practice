import { IsEmail, Length } from "class-validator";
import { BeforeInsert, Column, Entity as TOEntity, Index, JoinColumn, ManyToOne } from "typeorm";
import { makeId, slugify } from "../util/helpers";
import Entity from "./Entity";
import User from "./User";

@TOEntity('posts')
export default class Post extends Entity {

    constructor(post: Partial<Post>) {
        super()
        Object.assign(this, Post)
    }

    @Index()
    @Column()
    identifier: string // 7 Character Id

    @Column()
    title: string

    @Index()
    @Column()
    slug: string

    @Column({ nullable: true, type: 'text' })
    body: string

    @Column()
    subName: string

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: 'username', referencedColumnName: 'username' })
    user: User;

    @BeforeInsert()
    makeIdAndSlug() {
        this.identifier = makeId(7)
        this.slug = slugify(this.title)
    }
}
