import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import anime from 'animejs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'OneSPA';
  navlimits = [];
  scrollEvent;
  navAnimating = false;

  ngOnInit() {
    $(window).on('scroll', (event) => {
      const elem = event.currentTarget;
      const header = $('#header');
      if (!this.navAnimating) {
        this.setActiveNav($(elem).scrollTop());
      }
      if ($(elem).scrollTop() < 1) {
        if (!header.hasClass('shadow1')) {
          return;
        }
        header.css('color', 'white');
        header.css('background-image', $('#landing').css('background-image'));
        header.removeClass('shadow1');
      } else {
        if (header.hasClass('shadow1')) {
          return;
        }
        header.css('color', 'inherit');
        header.css('background-image', 'none');
        header.css('background-color', 'rgba(255,255,255,1)');
        header.addClass('shadow1');
      }
    });

    $(window).on('load', (event) => {
      this.setNavLimits();

      $('#fader').css('opacity', 0);
      setTimeout(() => {
        $('#fader').hide();
      }, 300);

      const elem = event.currentTarget;

      this.setActiveNav($(elem).scrollTop());

      const header = $('#header');
      if ($(elem).scrollTop() < 1) {
        if (!header.hasClass('shadow1')) {
          return;
        }
        header.css('color', 'white');
        header.css('background-image', $('#landing').css('background-image'));
        header.removeClass('shadow1');
      } else {
        if (header.hasClass('shadow1')) {
          return;
        }
        header.css('color', 'inherit');
        header.css('background-image', 'none');
        header.css('background-color', 'rgba(255,255,255,1)');
        header.addClass('shadow1');
      }
    });


    $('.navlink').on('click', (event) => {
      this.navAnimating = true;
      const elem = event.currentTarget;
      $('#header .menuitem').removeClass('active');
      $(elem).addClass('active');
      const hash = $(elem).attr('data-href');
      const offsetTop = $(hash).offset().top - 80;
      anime({
        targets: $('html').get(0),
        scrollTop: offsetTop,
        duration: 800,
        easing: 'easeOutSine',
        begin: (animation) => {
          this.navAnimating = true;
        },
        complete: (animation) => {
          this.navAnimating = false;
        }
      });
    });
  }

  setNavLimits() {
    $.each($('#header .navlink'), (index, value) => {
      const href = $(value).attr('data-href');
      if (href) {
        const obj = {
          element: value,
          ref: href,
          offset: $(href).offset().top
        };
        this.navlimits.push(obj);
      }
    });
    console.log(this.navlimits);
  }

  setActiveNav(scrollOffset) {
    scrollOffset = scrollOffset + 100;
    this.navlimits.forEach((value, index) => {
      if ((index + 1) < this.navlimits.length) {
        const nextOff = this.navlimits[index + 1].offset;
        if (scrollOffset >= value.offset && scrollOffset < nextOff) {
          $('#header .navlink').removeClass('active');
          $(value.element).addClass('active');
          return;
        }
      } else {
        if (scrollOffset >= value.offset) {
          $('#header .navlink').removeClass('active');
          $(value.element).addClass('active');
        }
      }
    });
  }
}
