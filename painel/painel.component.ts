import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public instrucao: string = 'Traduza a frase:';
  public frases: Array<Frase> = FRASES;
  public resposta: string = '';

  public rodada: number = 0;
  public rodadaFrase: Frase;

  public progresso: number = 0;

  public tentativas: number = 3;

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.atualizaRodada();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = ((<HTMLInputElement>resposta.target).value);
    //console.log(this.resposta);
  }

  public verificarResposta(): void {
    //console.log(this.tentativas);
    if(this.rodadaFrase.frasePtBr == this.resposta) {

      alert('A tradução está correta');

      //trocar pergunta da rodada
      this.rodada++;

      //proresso
      this.progresso = this.progresso + (100 / this.frases.length);
      //console.log(this.progresso);

      if(this.rodada === 4) {
        this.encerrarJogo.emit('Vitória');
      }

      //atualiza o objeto rodadaFrase
      this.atualizaRodada();
     
    } else {
      //diminuir a variável tentativas
      this.tentativas--;

      if(this.tentativas === -1) {
        this.encerrarJogo.emit('Derrota');
      }
    }
    //console.log(this.tentativas);
    
  }

  public atualizaRodada(): void {

    //define a frase da rodada
    this.rodadaFrase = this.frases[this.rodada];

    //limpa a resposta
    this.resposta = '';
  }
}
