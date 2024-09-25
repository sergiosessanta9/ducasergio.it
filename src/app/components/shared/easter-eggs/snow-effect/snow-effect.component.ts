import { AfterViewInit, Component, ElementRef, ViewChild, HostListener, Input } from '@angular/core';


@Component({
  selector: 'app-snow-effect',
  templateUrl: './snow-effect.component.html',
  styleUrls: ['./snow-effect.component.scss']
})


export class SnowEffectComponent implements AfterViewInit {

  @ViewChild('snowCanvas', { static: true }) snowCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private snowflakes: Snowflake[] = [];
  private canvasWidth!: number;
  private canvasHeight!: number;
  private animationId!: number;

  @Input() densityPerArea = 20; // Numero base di fiocchi per un'area standard
  @Input() speedFactor = 0.4;

  ngAfterViewInit() {
    this.ctx = this.snowCanvas.nativeElement.getContext('2d')!;
    this.setCanvasSize();
    this.updateSnowflakes(); // Crea fiocchi in base alla dimensione dello schermo
    this.animate();
  }

  // Calcolare dinamicamente il numero di fiocchi di neve
  updateSnowflakes() {
    const area = this.canvasWidth * this.canvasHeight;
    const snowflakeCount = Math.floor((area / 100000) * this.densityPerArea); // Proporziona i fiocchi in base all'area
    const currentCount = this.snowflakes.length;

    if (snowflakeCount > currentCount) {
      // Aggiungi nuovi fiocchi se ce ne sono troppo pochi
      for (let i = 0; i < snowflakeCount - currentCount; i++) {
        this.snowflakes.push(new Snowflake(this.canvasWidth, this.canvasHeight, this.speedFactor));
      }
    } else if (snowflakeCount < currentCount) {
      // Rimuovi i fiocchi in eccesso
      this.snowflakes.splice(snowflakeCount, currentCount - snowflakeCount);
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    for (const snowflake of this.snowflakes) {
      snowflake.update();
      snowflake.draw(this.ctx);
    }
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  // Ridimensiona il canvas in base alla finestra e aggiorna i fiocchi
  @HostListener('window:resize', [])
  setCanvasSize() {
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    this.snowCanvas.nativeElement.width = this.canvasWidth;
    this.snowCanvas.nativeElement.height = this.canvasHeight;
    this.updateSnowflakes(); // Aggiorna i fiocchi quando cambia la dimensione
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
  }

}

// Classe per i fiocchi di neve
class Snowflake {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;

  constructor(private canvasWidth: number, private canvasHeight: number, private speedFactor: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.radius = Math.random() * 3 + 2; // Dimensioni dei fiocchi
    this.speedX = (Math.random() * 1 - 0.5) * speedFactor; // Velocità orizzontale moltiplicata per il fattore velocità
    this.speedY = (Math.random() * 3 + 1) * speedFactor;   // Velocità verticale moltiplicata per il fattore velocità
    this.opacity = Math.random() * (1 - 0.3) + 0.3; // Opacità tra 0.3 e 1
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Se il fiocco esce dallo schermo, rimettilo in cima
    if (this.y > this.canvasHeight) {
      this.y = -this.radius;
      this.x = Math.random() * this.canvasWidth;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`; // Usa rgba per trasparenza
    ctx.fill();
    ctx.closePath();
  }
}

