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

// Hover animations for cards and interactive elements
export const hoverLiftAnimation = trigger('hoverLift', [
  state('normal', style({ transform: 'translateY(0px)' })),
  state('hovered', style({ transform: 'translateY(-5px)' })),
  transition('normal <=> hovered', animate('300ms ease'))
]);

export const slideInAnimation = trigger('slideIn', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)' }),
    animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
  ]),
  transition(':leave', [
    animate('300ms ease-out', style({ transform: 'translateX(-100%)' }))
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

// Project card hover animations
export const projectCardHoverAnimation = trigger('projectCardHover', [
  state(
    'normal',
    style({
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    })
  ),
  state(
    'hovered',
    style({
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
    })
  ),
  transition('normal <=> hovered', [
    animate('375ms cubic-bezier(0.165, 0.84, 0.44, 1)')
  ])
]);

export const projectCardImageAnimation = trigger('projectCardImage', [
  state(
    'normal',
    style({
      transform: 'translateY(0%)'
    })
  ),
  state(
    'hovered',
    style({
      transform: 'translateY(-100%)'
    })
  ),
  transition('normal <=> hovered', [
    animate('500ms cubic-bezier(0.165, 0.84, 0.44, 1)')
  ])
]);

export const projectCardImageSecondaryAnimation = trigger(
  'projectCardImageSecondary',
  [
    state(
      'normal',
      style({
        transform: 'translateY(100%)'
      })
    ),
    state(
      'hovered',
      style({
        transform: 'translateY(0%)'
      })
    ),
    transition('normal <=> hovered', [
      animate('500ms cubic-bezier(0.165, 0.84, 0.44, 1)')
    ])
  ]
);
