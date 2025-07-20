import { Component, OnInit } from '@angular/core';
import { fadeInUpStaggerAnimation } from '@shared/animations/fade-in-up.animation';

@Component({
  selector: 'page-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  animations: [fadeInUpStaggerAnimation]
})
export class AboutMeComponent implements OnInit {
  animationState = '';

  // Page content structure - will be populated from backend API
  pageContent = {
    title: "Hello, I'm Mikhail!",
    paragraphs: [
      "Welcome to my personal blog. I'm passionate about web development, design, and sharing knowledge with the world. Here you'll find my thoughts, projects, and more about my journey in tech and creativity.",
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus dolorum, consectetur quo ipsum labore quisquam commodi provident ducimus tenetur natus fuga blanditiis facilis saepe, ratione amet asperiores culpa sunt velit perspiciatis. Accusantium inventore repudiandae aspernatur earum magni dolorum rerum quisquam atque fuga architecto! Error nihil numquam dicta quibusdam sint architecto cupiditate molestias odit dolorum tempore magni facilis saepe mollitia libero atque fugit reiciendis eius fuga cumque minus optio voluptatem, doloribus quisquam culpa! Nulla ducimus deserunt expedita ipsum incidunt ad nobis hic accusamus tempore laboriosam repellendus architecto numquam aliquid distinctio natus autem at alias laudantium odio enim corrupti, labore repellat mollitia. Molestias eius omnis maxime quidem esse? Voluptates exercitationem, debitis quas totam pariatur earum iure unde amet. Reprehenderit autem corporis nihil maxime possimus laudantium optio delectus ullam dolore fuga? Consectetur iusto, voluptatem ipsum, ad iure voluptates, in earum sunt illo quibusdam suscipit deserunt labore minus rerum beatae. Facilis, quaerat debitis id ut consectetur dignissimos vero obcaecati. Aspernatur dicta accusantium eos, blanditiis vero unde minus soluta id tenetur reiciendis, nesciunt veritatis? Voluptatibus voluptates illo optio quas ea porro eos eius hic tenetur autem dolor adipisci doloribus eaque maiores ipsum nemo soluta suscipit deleniti, nulla nisi. Ducimus magnam alias vitae, atque eum totam nesciunt sapiente architecto maxime cum, rerum tempora nisi, hic itaque neque. Tenetur cupiditate optio doloremque! Doloremque recusandae inventore ex vitae mollitia et, repellendus exercitationem, dignissimos sit ad adipisci cupiditate fugiat ullam magnam aperiam tempora suscipit ut pariatur a eligendi quis. Provident sit veritatis nam molestiae fugit inventore rerum animi asperiores deserunt ipsam amet dignissimos totam earum eos id, voluptate doloribus corporis officiis consequuntur vitae minima explicabo necessitatibus atque? Mollitia minus magni repellendus enim, nisi quam sint minima. Necessitatibus repellendus non blanditiis, culpa id nesciunt ab, adipisci, quasi dolor corporis eaque labore ipsam! Recusandae laborum veritatis totam veniam qui hic unde.',
      'Feel free to connect with me or explore my latest work!'
    ]
  };

  ngOnInit() {
    // Trigger animation after view is initialized
    setTimeout(() => {
      this.animationState = 'loaded';
    }, 100);
  }
}
