import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from 'src/auth/guard/myjwt.guard';
import { PostService } from './post.service';
import { GetUser } from 'src/auth/decorator/user.decorator';
import { InsertPostDTO } from './dto/insert.post.dto';
import { UpdatePostDTO } from './dto/update.post.dto';

@UseGuards(MyJwtGuard)
@Controller('post')
export class PostController {
    constructor(
        private postService: PostService
    ) { }

    @Get()
    getPosts(@GetUser('id') userId: number) { //từ cái GetUser('id') sẽ lấy ra được id user đăng nhập
        return this.postService.getPosts(userId)
    }

    @Get(':id')
    getPostById(@Param('id') id: number) {
        return this.postService.getPostById(id)
    }

    @Post()
    insertPost(
        @GetUser('id') userId: number,
        @Body() insertPost: InsertPostDTO
    ) {
        return this.postService.insertPost(userId, insertPost)
    }

    @Patch(':id')
    updatePost(
        @Param('id', ParseIntPipe) id: number,
        @Body() postBody: UpdatePostDTO
    ) {
        this.postService.updatePostById(id, postBody)
    }

    @Delete(':id')
    deletePost(@Param('id') id: number) {
        return this.postService.deletePost(id)
    }
}
