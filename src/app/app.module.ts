import { TipoLoginService } from './cadastros/tipo-login/tipo-login.service';
import { PerfilService } from './cadastros/perfil/perfil.service';
import { VendaStatusService } from './cadastros/venda-status/venda-status.service';
import { PedidoStatusService } from './cadastros/pedido-status/pedido-status.service';
import { UsuarioModule } from './cadastros/usuario/usuario.module';
import { VendaService } from './operacoes/saida/venda/venda.service';
import { VendaModule } from './operacoes/saida/venda/venda.module';
import { EstoqueService } from './estoque/estoque.service';
import { EstoqueModule } from './estoque/estoque.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component';
import { ServicoPrestadoModule } from './servico-prestado/servico-prestado.module';
import { ServicoPrestadoService } from './servico-prestado.service';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthService } from './auth.service';
import { TokenInterceptor } from './token.interceptor';
import { ClienteModule } from './cadastros/clientes/cliente.module';
import { ClienteService } from './cadastros/clientes/cliente.service';
import { UnidadeMedidaService } from './cadastros/unidade-medida/unidade-medida.service';
import { CategoriaService } from './cadastros/categoria/categoria.service';
import { ProdutoService } from './cadastros/produto/produto.service';
import { PedidoService } from './operacoes/entrada/pedido/pedido.service';
import { FornecedorService } from './cadastros/fornecedor/fornecedor.service';
import { UnidadeMedidaModule } from './cadastros/unidade-medida/unidada-medida.module';
import { CategoriaaModule } from './cadastros/categoria/categoria.module';
import { ProdutoaModule } from './cadastros/produto/produto.module';
import { PedidoModule } from './operacoes/entrada/pedido/pedido.module';
import { FornecedorModule } from './cadastros/fornecedor/fornecedor.module';
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './cadastros/usuario/usuario.service';

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, LayoutComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TemplateModule,
    UsuarioModule,
    UnidadeMedidaModule,
    CategoriaaModule,
    ClienteModule,
    FornecedorModule,
    ProdutoaModule,
    EstoqueModule,
    PedidoModule,
    VendaModule,
    ServicoPrestadoModule,
    SocialLoginModule,
  ],
  providers: [
    UsuarioService,
    UnidadeMedidaService,
    CategoriaService,
    ProdutoService,
    EstoqueService,
    PedidoService,
    VendaService,
    ClienteService,
    FornecedorService,
    ServicoPrestadoService,
    PedidoStatusService,
    VendaStatusService,
    PerfilService,
    TipoLoginService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleId
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
