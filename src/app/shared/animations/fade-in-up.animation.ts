import {
  trigger,
  style,
  transition,
  animate,
  query,
  stagger,
  state
} from '@angular/animations';

// Simple approach: CSS handles the initial state, Angular handles the animation
export const fadeInUpStaggerAnimation = trigger('fadeInUpStagger', [
  transition('* => loaded', [
    query(
      '.text-animate, .changelog-entry',
      [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        stagger('100ms', [
          animate(
            '600ms ease-out',
            style({ opacity: 1, transform: 'translateY(0)' })
          )
        ])
      ],
      { optional: true }
    )
  ])
]);

export const changelogStaggerAnimation = trigger('changelogStagger', [
  transition('* => loaded', [
    query(
      '.changelog-entry',
      [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        stagger('200ms', [
          animate(
            '600ms ease-out',
            style({ opacity: 1, transform: 'translateY(0)' })
          )
        ])
      ],
      { optional: true }
    )
  ])
]);

// Menu tile animations
export const menuTileAnimation = trigger('menuTile', [
  transition('* => loaded', [
    query(
      '.flow-item-wrapper',
      [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        stagger('100ms', [
          animate(
            '600ms ease-out',
            style({ opacity: 1, transform: 'translateY(0)' })
          )
        ])
      ],
      { optional: true }
    )
  ])
]);

// Blog post animations
export const blogPostAnimation = trigger('blogPost', [
  transition('* => loaded', [
    query(
      'component-post-card',
      [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        stagger('150ms', [
          animate(
            '600ms ease-out',
            style({ opacity: 1, transform: 'translateY(0)' })
          )
        ])
      ],
      { optional: true }
    )
  ])
]);

// Project animations
export const projectAnimation = trigger('project', [
  transition('* => loaded', [
    query(
      'component-project-card',
      [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        stagger('150ms', [
          animate(
            '600ms ease-out',
            style({ opacity: 1, transform: 'translateY(0)' })
          )
        ])
      ],
      { optional: true }
    )
  ])
]);

// Navigation menu slide animation
export const navMenuSlideAnimation = trigger('navMenuSlide', [
  state(
    'closed',
    style({
      transform: 'translateY(-100%)',
      opacity: 0,
      visibility: 'hidden'
    })
  ),
  state(
    'open',
    style({
      transform: 'translateY(0)',
      opacity: 1,
      visibility: 'visible'
    })
  ),
  transition('closed <=> open', [
    animate('400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)')
  ])
]);

// Burger menu animation
export const burgerMenuAnimation = trigger('burgerMenu', [
  state(
    'closed',
    style({
      transform: 'rotate(0deg)'
    })
  ),
  state(
    'open',
    style({
      transform: 'rotate(180deg)'
    })
  ),
  transition('closed <=> open', [animate('300ms ease')])
]);
