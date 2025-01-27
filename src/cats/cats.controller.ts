import { Body, Controller, Get, HostParam, Param, Post, Query, Redirect, Req } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CatsDto } from './dto/cats.dto';

// @Controller({ host: 'sub.example.com'}) // Controllers & Sub-domain routing
@Controller('cats')
export class CatsController {
    @Post()
    create(): string {
        return 'This action adds a new cat'
    }
    
    ////////////////////////////////////////////
    
    // Controllers
    // # Request object
    // # Resources
    // # Status code
    // # Response headers
    // # Redirection
    // # Route parameters
    /**
     * @Get('path/path') @Post() @Put() @Delete() @Patch() @Options() @Head() @All()
     * @Request()=@Req() @Response()=@Res() @Next() @Session() @Param() @Body() @Query() @Headers() @Ip() @HostParam()
     * @HttpCode() @Header('Cache-Control', 'no-store') @Redirect('https://url', redirect_code)
    */

    // # Redirection Example
    @Get('docs')
    @Redirect('https://docs.nestjs.com')
    getDocs(@Query('version') version) {
        if (version && version == '5') {
            return { url : 'https://docs.nestjs.com/v5/' }
        }
    }
    
    // # Route parameters Example
    @Get(':id')
    findOne(@Param() params: any): string {
        console.log(params.id);
        return `This action returns a #${params.id} cat`;
    }
    /**
     * fineOne은 Param 객체를 메소드로 가져와서 처리하는 방식
     * findOneSpecific은 Param 객체 중 id만 가져와서 처리하는 방식
     */
    @Get('spec/:id')
    findOneSpecific(@Param('id') id: string): string {
        console.log(id);
        return `This action returns a #${id} cat`;
    }
    ////////////////////////////////////////////
    
    // Controllers # Route wildcards
    /**
     * @Get('abcd/*') 이렇게 쓰면 Warning 뜨는데, 
     * \* 대신 *path로 쓰면 됨. (path는 그냥 명칭 부여용, *asdf처럼 써도 됨)
    */
    @Get('abcd/*asdf')
    findAll(@Req() request: Request): string {
       return 'This action returns all cats';
    }
    /////////////////////////////////////////////
    
    // Controllers # Asynchonicity
    /**
     * async & Promise 또는 Observable
    */
    @Get()
    async getCatsAsync(): Promise<any[]>{
       return [];
    }
    
    @Get()
    getCatsObservable(): Observable<any[]> {
        return of([]);
    }
    ////////////////////////////////////////////

    // Controllers # Request payloads
    @Post()
    async postCats(@Body() catsDto: CatsDto) {
        return 'insert a new cat'
    }
    ///////////////////////////////////////////

    // Controllers # Query parameters
    /**
     * 더 복잡한 쿼리를 다루려면, extended parser 활성화해야 됨.
     * 활성화 방법은 문서 본문 참고.
     */
    @Get()
    async getCats(@Query('age') age: number, @Query('breed') breed: string) {
        return `This action returns all cats filtered by age: ${age} and breed ${breed}`;
    }
    ////////////////////////////////////////////
}




// // Controllers # Sub-domain routing
// @Controller({ host: 'admin.example.com'})
// export class AdminController {
//   @Get()
//   index(): string {
//     return 'Admin Page';
//   }
// }

// @Controller({ host: ':account.example.com' })
// export class AccountController {
//   @Get()
//   getInfo(@HostParam('account') account: string) {
//     return account;
//   }
// }
// //////////////////////////////////////////