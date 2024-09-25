import { AfterViewInit, Component, ElementRef, ViewChild, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-confetti-effect',
  templateUrl: './confetti-effect.component.html',
  styleUrls: ['./confetti-effect.component.scss']
})
export class ConfettiEffectComponent {
  @ViewChild('confettiCanvas', { static: true }) confettiCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private confettiParticles: Confetti[] = [];
  private canvasWidth!: number;
  private canvasHeight!: number;
  private animationId!: number;
  @Input() particleCount = 2000; // Numero di coriandoli
  @Input() power = 2.2; // Potenza del cannone

  ngAfterViewInit() {
    this.ctx = this.confettiCanvas.nativeElement.getContext('2d')!;
    this.setCanvasSize();
    this.createConfetti(this.particleCount); // Crea coriandoli con la potenza del cannone
    this.animate();
  }

  // Crea i coriandoli
  createConfetti(count: number) {
    for (let i = 0; i < count; i++) {
      this.confettiParticles.push(new Confetti(this.canvasWidth, this.canvasHeight, this.power));
    }
  }

  // Animazione continua
  animate() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Aggiorna e disegna ciascun coriandolo
    for (const confetti of this.confettiParticles) {
      confetti.update();
      confetti.draw(this.ctx);
    }

    // Controlla se tutti i coriandoli sono fuori schermo
    const allOffScreen = this.confettiParticles.every(confetti => confetti.isOffScreen);

    if (!allOffScreen) {
      // Continua l'animazione solo se ci sono coriandoli sullo schermo
      this.animationId = requestAnimationFrame(() => this.animate());
    }
  }

  // Aggiusta la dimensione del canvas quando la finestra viene ridimensionata
  @HostListener('window:resize', [])
  setCanvasSize() {
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    this.confettiCanvas.nativeElement.width = this.canvasWidth;
    this.confettiCanvas.nativeElement.height = this.canvasHeight;
  }

  // Pulizia dell'animazione quando il componente viene distrutto
  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
  }

  // Metodo per impostare la potenza del cannone
  setPower(power: number) {
    this.power = power; // Aggiorna la potenza del cannone
    this.confettiParticles = []; // Ripulisce i coriandoli precedenti
    this.createConfetti(this.particleCount); // Ricrea i coriandoli con la nuova potenza
  }
}

// Classe per un singolo coriandolo
class Confetti {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  speedX: number;
  speedY: number;
  gravity: number;
  rotation: number;
  rotationSpeed: number;
  isOffScreen: boolean; // Indica se il coriandolo è fuori schermo

  constructor(private canvasWidth: number, private canvasHeight: number, private power: number) {
    // Partenza casuale dal basso e dai lati (sinistra o destra)
    this.x = Math.random() < 0.5 ? -10 : canvasWidth + 10; // Posizione laterale (sinistra o destra)
    this.y = canvasHeight; // Partenza dalla base del canvas
    this.width = Math.random() * 10 + 5; // Larghezza casuale
    this.height = Math.random() * 5 + 2; // Altezza casuale
    this.color = this.getRandomColor();
    this.speedX = (Math.random() * 3 - 1.5) * power; // Movimento laterale casuale verso il centro
    this.speedY = (Math.random() * -3 - 3) * power; // Slancio iniziale verso l'alto influenzato dalla potenza
    this.gravity = Math.random() * 0.05 + 0.02; // Gravità casuale
    this.rotation = Math.random() * 360; // Rotazione iniziale
    this.rotationSpeed = Math.random() * 10 - 5; // Velocità di rotazione
    this.isOffScreen = false; // Inizia sullo schermo
  }

  // Aggiorna la posizione e applica la gravità
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.gravity; // Aumenta la velocità verso il basso con la gravità
    this.rotation += this.rotationSpeed;

    // Controlla se il coriandolo è uscito dallo schermo
    if (this.y > this.canvasHeight + this.height) {
      this.isOffScreen = true; // Segnala che è uscito dallo schermo
    }
  }

  // Disegna il coriandolo sul canvas
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }

  // Genera un colore casuale
  getRandomColor(): string {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFFF33', '#33FFF5'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}