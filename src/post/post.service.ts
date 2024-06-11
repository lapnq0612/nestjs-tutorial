import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertPostDTO } from './dto/insert.post.dto';
import { UpdatePostDTO } from './dto/update.post.dto';

@Injectable()
export class PostService {
    constructor(
        private prismaService: PrismaService,
    ) { }

    async getPosts(userId: number) {
        try {
            const listPost = await this.prismaService.post.findMany({
                where: {
                    userId: userId
                }
            })

            return listPost;
        } catch (error) {
            throw error
        }
    }

    async insertPost(userId: number, insertPost: InsertPostDTO) {
        try {
            const post = await this.prismaService.post.create({
                data: {
                    ...insertPost,
                    userId
                } as any
            })

            return post;
        } catch (error) {
            throw error
        }
    }

    async getPostById(postId: number) {
        try {
            const post = await this.prismaService.post.findUnique({
                where: {
                    id: Number(postId)
                }
            })

            return post
        } catch (error) {
            throw error;
        }
    }

    async updatePostById(postId: number, updatePost: UpdatePostDTO) {
        try {
            const post = await this.prismaService.post.findUnique({
                where: {
                    id: postId
                }
            })

            if (!post) {
                throw new NotFoundException('Post does not exist')
            }

            return await this.prismaService.post.update({
                where: {
                    id: post.id
                },
                data: {
                   ...updatePost
                }
            })
        } catch (error) {
            throw error
        }
    }

    async deletePost(postId: number) {
        try {
            const post = await this.prismaService.post.findUnique({
                where: {
                    id: Number(postId)
                }
            })

            if (!post) {
                throw new NotFoundException('Post does not exist')
            }

            return await this.prismaService.post.delete({
                where: {
                    id: post.id
                }
            })
        } catch (error) {
            throw error
        }
    }
}
