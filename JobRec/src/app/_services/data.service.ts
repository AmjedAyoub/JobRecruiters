import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { DocsService } from './doc.service';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit, OnDestroy {
  private docsSub: Subscription;
  private dataChangedListener = new Subject<
    {
      id: number;
      title: string;
      team: string;
      position: number;
      createdAt: string;
      updatedAt: string;
      createdBy: string;
      manager: string;
      status: string;
      submission: number;
      description: string;
    }[]
  >();
  private candidateChangedListener = new Subject<
    {
      id: number;
      fullName: string;
      email: string;
      phone: string;
      jobs: number[];
      resume: string;
    }[]
  >();
  private candidates1 = [];

  private candidates = [
    {
      fullName: 'Kristin Horton',
      email: 'bennettcarpenter@zoinage.com',
      phone: '(961) 563-3478',
      skills: [
        'Java',
        'Java',
        'Angular',
        'JavaScript'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Rice Aguirre',
      email: 'henriettahouse@insuron.com',
      phone: '(817) 580-2361',
      skills: [
        'Azure',
        'Angular',
        'Java',
        'C++'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Diaz Mcconnell',
      email: 'mcgeebenson@acumentor.com',
      phone: '(859) 575-3813',
      skills: [
        'HTNL',
        'Java',
        'Angular',
        'C#'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Liz Newman',
      email: 'fisherhebert@hawkster.com',
      phone: '(923) 592-2347',
      skills: [
        'Azure',
        'C++',
        'HTNL',
        'C#'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Atkins Maddox',
      email: 'edwinaharvey@orbiflex.com',
      phone: '(840) 530-2329',
      skills: [
        'React',
        'C++',
        'AWS',
        'Java'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Britney Vaughan',
      email: 'brookeduffy@manufact.com',
      phone: '(982) 516-2830',
      skills: [
        'C++',
        'HTNL',
        'C#',
        'HTNL'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Mallory Whitfield',
      email: 'maxinegriffin@zillidium.com',
      phone: '(898) 536-2857',
      skills: [
        'Java',
        'Java',
        'Azure',
        'C#'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Keith Workman',
      email: 'knowlesturner@zytrex.com',
      phone: '(934) 508-2178',
      skills: [
        'HTNL',
        'Java',
        'React',
        'C#'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Imogene Hinton',
      email: 'crystalhale@zolavo.com',
      phone: '(907) 430-2148',
      skills: [
        'C++',
        'Java',
        'Angular',
        'HTNL'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Baker Nixon',
      email: 'garzaellis@comverges.com',
      phone: '(826) 543-3156',
      skills: [
        'AWS',
        'HTNL',
        'Azure',
        'HTNL'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Simone Morris',
      email: 'feliciacrosby@zaya.com',
      phone: '(871) 542-2195',
      skills: [
        'Angular',
        'React',
        'C++',
        'React'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Rachelle Humphrey',
      email: 'tranguzman@zaphire.com',
      phone: '(930) 400-2557',
      skills: [
        'HTNL',
        'Java',
        'C#',
        'Angular'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Jannie Watts',
      email: 'chrystallittle@sensate.com',
      phone: '(932) 562-2240',
      skills: [
        'C++',
        'React',
        'AWS',
        'Azure'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Savannah Erickson',
      email: 'molinamercado@zillacon.com',
      phone: '(877) 421-3368',
      skills: [
        'HTNL',
        'C#',
        'Angular',
        'AWS'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Marian Conner',
      email: 'wynnmurphy@fibrodyne.com',
      phone: '(987) 509-3433',
      skills: [
        'React',
        'HTNL',
        'Angular',
        'C++'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Katherine Wolf',
      email: 'benitasalas@sentia.com',
      phone: '(940) 538-3123',
      skills: [
        'Java',
        'Java',
        'JavaScript',
        'HTNL'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Odom Garrison',
      email: 'rosellacrane@petigems.com',
      phone: '(906) 590-2329',
      skills: [
        'JavaScript',
        'React',
        'C++',
        'Java'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Bettie Kirkland',
      email: 'castillofitzgerald@qot.com',
      phone: '(978) 401-3149',
      skills: [
        'Java',
        'Azure',
        'Angular',
        'Java'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Marquez Lloyd',
      email: 'colemanhayden@dognost.com',
      phone: '(809) 443-3750',
      skills: [
        'React',
        'Azure',
        'Angular',
        'AWS'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Melisa Duran',
      email: 'rosettanorman@insurity.com',
      phone: '(944) 428-2785',
      skills: [
        'Java',
        'Azure',
        'Azure',
        'AWS'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Nell Shannon',
      email: 'shepardmosley@zytrax.com',
      phone: '(979) 554-3119',
      skills: [
        'React',
        'Azure',
        'Java',
        'Angular'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Juliet Vazquez',
      email: 'maureenstark@pheast.com',
      phone: '(945) 597-3122',
      skills: [
        'C++',
        'AWS',
        'Azure',
        'Azure'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Ortiz Reed',
      email: 'sheltonbrewer@pigzart.com',
      phone: '(993) 416-3748',
      skills: [
        'C++',
        'JavaScript',
        'Angular',
        'Azure'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Estelle Stone',
      email: 'lorenarivera@flexigen.com',
      phone: '(953) 507-3473',
      skills: [
        'HTNL',
        'Azure',
        'C++',
        'C++'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Marisol Colon',
      email: 'brewerstanley@coriander.com',
      phone: '(806) 427-2213',
      skills: [
        'HTNL',
        'JavaScript',
        'Azure',
        'Azure'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Lilly Goff',
      email: 'kirkglass@zensor.com',
      phone: '(955) 581-3448',
      skills: [
        'C++',
        'Azure',
        'Azure',
        'Angular'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Duke Lee',
      email: 'hardinhubbard@combot.com',
      phone: '(949) 525-3627',
      skills: [
        'C++',
        'React',
        'AWS',
        'AWS'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Obrien Cooke',
      email: 'conradreid@calcu.com',
      phone: '(879) 599-2183',
      skills: [
        'Azure',
        'AWS',
        'HTNL',
        'React'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Grant Mejia',
      email: 'florinewatkins@vortexaco.com',
      phone: '(898) 442-2566',
      skills: [
        'JavaScript',
        'C#',
        'JavaScript',
        'C++'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Head Hudson',
      email: 'elenaweeks@handshake.com',
      phone: '(827) 456-2254',
      skills: [
        'JavaScript',
        'HTNL',
        'Azure',
        'C++'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'French Soto',
      email: 'hickmanmadden@ecrater.com',
      phone: '(842) 513-2759',
      skills: [
        'C#',
        'C++',
        'JavaScript',
        'JavaScript'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Esperanza Parrish',
      email: 'cainrice@krog.com',
      phone: '(948) 430-3971',
      skills: [
        'C#',
        'Azure',
        'Azure',
        'Java'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Gayle Marquez',
      email: 'vaughnterry@stockpost.com',
      phone: '(960) 432-2072',
      skills: [
        'AWS',
        'JavaScript',
        'Java',
        'React'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Scott Velez',
      email: 'nievesrasmussen@telpod.com',
      phone: '(942) 513-3194',
      skills: [
        'Azure',
        'Angular',
        'Azure',
        'JavaScript'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Williams Whitehead',
      email: 'roseknox@hairport.com',
      phone: '(803) 580-3579',
      skills: [
        'React',
        'Azure',
        'Azure',
        'JavaScript'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Shauna Rosales',
      email: 'pansyrodriquez@uni.com',
      phone: '(900) 417-2608',
      skills: [
        'JavaScript',
        'Azure',
        'React',
        'React'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Connie Ruiz',
      email: 'letagonzales@isologix.com',
      phone: '(985) 504-3189',
      skills: [
        'React',
        'HTNL',
        'Java',
        'Angular'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Clayton Koch',
      email: 'frankiehiggins@injoy.com',
      phone: '(953) 403-2346',
      skills: [
        'React',
        'HTNL',
        'Java',
        'C#'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Simmons Goodman',
      email: 'chelseale@exposa.com',
      phone: '(956) 593-3833',
      skills: [
        'React',
        'C++',
        'HTNL',
        'C++'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Hallie Jimenez',
      email: 'reneejordan@elentrix.com',
      phone: '(870) 451-2447',
      skills: [
        'Java',
        'Azure',
        'JavaScript',
        'C#'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Calderon Mitchell',
      email: 'bonnerbell@entogrok.com',
      phone: '(910) 557-3067',
      skills: [
        'AWS',
        'HTNL',
        'React',
        'HTNL'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Reed Montgomery',
      email: 'prattsherman@micronaut.com',
      phone: '(951) 596-3536',
      skills: [
        'C#',
        'Azure',
        'Angular',
        'C++'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Darla Huffman',
      email: 'harriettschroeder@acium.com',
      phone: '(977) 570-2798',
      skills: [
        'C++',
        'JavaScript',
        'Azure',
        'React'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Beach Stanton',
      email: 'angeliquecox@bizmatic.com',
      phone: '(810) 478-2312',
      skills: [
        'C++',
        'C++',
        'HTNL',
        'React'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Avis Allison',
      email: 'jordanstevens@equitax.com',
      phone: '(828) 445-2435',
      skills: [
        'AWS',
        'C#',
        'Java',
        'C++'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Pauline Melendez',
      email: 'marshcunningham@toyletry.com',
      phone: '(856) 546-2485',
      skills: [
        'C++',
        'Angular',
        'HTNL',
        'Angular'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Fannie Case',
      email: 'mcguireevans@thredz.com',
      phone: '(810) 407-2502',
      skills: [
        'React',
        'Java',
        'AWS',
        'Angular'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Maldonado Norton',
      email: 'mitzihaney@ezent.com',
      phone: '(976) 430-3105',
      skills: [
        'React',
        'C#',
        'Angular',
        'Angular'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Kramer Wilder',
      email: 'stevensbond@datacator.com',
      phone: '(841) 456-2253',
      skills: [
        'HTNL',
        'Angular',
        'AWS',
        'Java'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Delia Weaver',
      email: 'burkehunter@xumonk.com',
      phone: '(920) 543-3692',
      skills: [
        'React',
        'JavaScript',
        'AWS',
        'Java'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Marianne Wallace',
      email: 'stephensoneverett@magnemo.com',
      phone: '(807) 574-2790',
      skills: [
        'C++',
        'Azure',
        'Angular',
        'JavaScript'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Lillie Ferrell',
      email: 'warnerzimmerman@genmy.com',
      phone: '(884) 558-2131',
      skills: [
        'C++',
        'React',
        'Angular',
        'C++'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Dona Randolph',
      email: 'dionnewood@obliq.com',
      phone: '(980) 402-3318',
      skills: [
        'Angular',
        'JavaScript',
        'Java',
        'JavaScript'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Joseph Mullen',
      email: 'poolekeith@caxt.com',
      phone: '(994) 455-3050',
      skills: [
        'JavaScript',
        'HTNL',
        'C#',
        'C++'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Bettye Murray',
      email: 'samanthawiggins@vicon.com',
      phone: '(893) 534-2557',
      skills: [
        'React',
        'HTNL',
        'C++',
        'JavaScript'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Lucile Holcomb',
      email: 'earnestinesalinas@vantage.com',
      phone: '(864) 409-2364',
      skills: [
        'HTNL',
        'C#',
        'Java',
        'React'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Leann Willis',
      email: 'andrewspetty@datagene.com',
      phone: '(813) 524-3107',
      skills: [
        'Angular',
        'JavaScript',
        'React',
        'HTNL'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Dixon Abbott',
      email: 'mirandachavez@egypto.com',
      phone: '(895) 584-3828',
      skills: [
        'HTNL',
        'C#',
        'C#',
        'JavaScript'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Hahn Sanchez',
      email: 'jamieortiz@polaria.com',
      phone: '(855) 451-3270',
      skills: [
        'JavaScript',
        'JavaScript',
        'C#',
        'JavaScript'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Wilson Robbins',
      email: 'pollyduke@tubesys.com',
      phone: '(864) 512-2700',
      skills: [
        'Azure',
        'Angular',
        'Azure',
        'AWS'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Butler Ryan',
      email: 'salliesummers@bytrex.com',
      phone: '(857) 510-3235',
      skills: [
        'AWS',
        'C#',
        'C#',
        'Java'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Charmaine Gilbert',
      email: 'altapatel@tingles.com',
      phone: '(954) 445-3516',
      skills: [
        'AWS',
        'Azure',
        'JavaScript',
        'Java'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Ware Sullivan',
      email: 'chrischapman@overplex.com',
      phone: '(962) 590-3307',
      skills: [
        'Azure',
        'Azure',
        'C#',
        'React'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Lambert Larson',
      email: 'pittmanwinters@orbaxter.com',
      phone: '(998) 482-3758',
      skills: [
        'AWS',
        'React',
        'Angular',
        'AWS'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Bonita Boyle',
      email: 'corinemontoya@xoggle.com',
      phone: '(885) 421-2670',
      skills: [
        'Azure',
        'C++',
        'Angular',
        'C#'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Foreman Jones',
      email: 'helenatkinson@quinex.com',
      phone: '(912) 494-3910',
      skills: [
        'JavaScript',
        'C#',
        'React',
        'Java'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Natalie Kane',
      email: 'avasuarez@insectus.com',
      phone: '(969) 585-2091',
      skills: [
        'Azure',
        'HTNL',
        'Angular',
        'C#'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'David Park',
      email: 'carneyhansen@maximind.com',
      phone: '(941) 555-3880',
      skills: [
        'HTNL',
        'Azure',
        'AWS',
        'C++'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Pace Mendez',
      email: 'angelitarussell@zensure.com',
      phone: '(833) 461-2965',
      skills: [
        'Java',
        'HTNL',
        'Angular',
        'Azure'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Juanita Henry',
      email: 'joanneblevins@niquent.com',
      phone: '(830) 526-2701',
      skills: [
        'Java',
        'HTNL',
        'C#',
        'Azure'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Leonor Lang',
      email: 'garnerbarker@tripsch.com',
      phone: '(861) 587-3391',
      skills: [
        'Java',
        'Azure',
        'Angular',
        'Angular'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Hammond Gibson',
      email: 'rosaleshickman@ecstasia.com',
      phone: '(956) 457-3840',
      skills: [
        'React',
        'C++',
        'JavaScript',
        'C#'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Hilda Zamora',
      email: 'fredericklevy@imant.com',
      phone: '(913) 484-3672',
      skills: [
        'Java',
        'C++',
        'C++',
        'HTNL'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Beryl Pierce',
      email: 'jamesramsey@xyqag.com',
      phone: '(949) 523-3149',
      skills: [
        'AWS',
        'Java',
        'JavaScript',
        'HTNL'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Hurst Adams',
      email: 'princeperez@stelaecor.com',
      phone: '(850) 582-2107',
      skills: [
        'React',
        'React',
        'React',
        'Angular'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Isabella Poole',
      email: 'suttongregory@aeora.com',
      phone: '(970) 593-3350',
      skills: [
        'HTNL',
        'C++',
        'Azure',
        'JavaScript'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Lena Shaw',
      email: 'jamesreeves@pivitol.com',
      phone: '(811) 414-3142',
      skills: [
        'React',
        'C#',
        'C++',
        'HTNL'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Susana Sanford',
      email: 'jerrilangley@kengen.com',
      phone: '(981) 431-2981',
      skills: [
        'C++',
        'JavaScript',
        'AWS',
        'Angular'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Nannie Powell',
      email: 'pattersoncummings@ronelon.com',
      phone: '(972) 409-2898',
      skills: [
        'Angular',
        'HTNL',
        'Azure',
        'Angular'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Patton Clemons',
      email: 'maurasnider@zaggles.com',
      phone: '(847) 462-2892',
      skills: [
        'C#',
        'JavaScript',
        'C#',
        'Angular'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Dunn Griffith',
      email: 'bethmclaughlin@bulljuice.com',
      phone: '(959) 485-2612',
      skills: [
        'JavaScript',
        'AWS',
        'HTNL',
        'C#'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Eve Howard',
      email: 'rhodeskline@evidends.com',
      phone: '(984) 509-3014',
      skills: [
        'Java',
        'C#',
        'React',
        'Azure'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Fox Morgan',
      email: 'pottscruz@tubalum.com',
      phone: '(836) 507-2125',
      skills: [
        'Angular',
        'Angular',
        'Java',
        'Java'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Harmon Berg',
      email: 'margeryhahn@quonk.com',
      phone: '(892) 560-3161',
      skills: [
        'C++',
        'AWS',
        'C#',
        'C++'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Barlow Fernandez',
      email: 'nealclark@skybold.com',
      phone: '(960) 466-2348',
      skills: [
        'AWS',
        'HTNL',
        'AWS',
        'C#'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Letha Alexander',
      email: 'sharonmcneil@adornica.com',
      phone: '(802) 525-3392',
      skills: [
        'JavaScript',
        'C++',
        'React',
        'C++'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Gloria Monroe',
      email: 'besthopper@reversus.com',
      phone: '(980) 537-3988',
      skills: [
        'C#',
        'JavaScript',
        'C#',
        'AWS'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Hester Burns',
      email: 'bergwynn@oulu.com',
      phone: '(858) 447-3669',
      skills: [
        'AWS',
        'Java',
        'AWS',
        'Java'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Janine Gallagher',
      email: 'bridgetjensen@honotron.com',
      phone: '(847) 474-2184',
      skills: [
        'Azure',
        'AWS',
        'JavaScript',
        'Angular'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Chandler Vasquez',
      email: 'lorriegillespie@eclipto.com',
      phone: '(840) 403-2062',
      skills: [
        'C#',
        'Java',
        'Java',
        'Angular'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Berta Mccarthy',
      email: 'marilynmarsh@netur.com',
      phone: '(804) 597-3935',
      skills: [
        'HTNL',
        'Java',
        'HTNL',
        'HTNL'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Emilia Ware',
      email: 'evamiranda@digigene.com',
      phone: '(933) 525-2528',
      skills: [
        'C++',
        'Java',
        'Azure',
        'AWS'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Jessica Clements',
      email: 'mendozagould@cubicide.com',
      phone: '(940) 433-2943',
      skills: [
        'Angular',
        'Java',
        'Java',
        'C#'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Gay Beasley',
      email: 'riddlemoreno@syntac.com',
      phone: '(985) 565-3458',
      skills: [
        'JavaScript',
        'C#',
        'JavaScript',
        'React'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Mccoy Banks',
      email: 'brightstephens@electonic.com',
      phone: '(950) 461-2451',
      skills: [
        'Azure',
        'JavaScript',
        'HTNL',
        'React'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Vinson Nunez',
      email: 'elizabethfrazier@plexia.com',
      phone: '(974) 416-2995',
      skills: [
        'Java',
        'C++',
        'HTNL',
        'HTNL'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Walsh Coleman',
      email: 'elliottobrien@menbrain.com',
      phone: '(877) 437-2766',
      skills: [
        'Java',
        'C++',
        'C#',
        'Azure'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Janna Scott',
      email: 'tabitharowe@kangle.com',
      phone: '(832) 469-3672',
      skills: [
        'AWS',
        'React',
        'AWS',
        'Java'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Angie Bradford',
      email: 'barbaragrant@noralex.com',
      phone: '(911) 487-2884',
      skills: [
        'C++',
        'Azure',
        'JavaScript',
        'HTNL'
      ],
      resume: '',
      jobs: []
    },
    {
      fullName: 'Bray Holland',
      email: 'campbelldudley@freakin.com',
      phone: '(964) 418-2948',
      skills: [
        'Java',
        'C++',
        'HTNL',
        'HTNL'
      ],
      resume: '',
      jobs: []
    }
  ];

  private rowData2 = [];

  private rowData = [
    {
      id: 100,
      title: 'Web Developer',
      team: 'Microsoft',
      position: 2,
      submission: 0,
      manager: 'Caldwell Herring',
      createdAt: '01/27/2020',
      updatedAt: '09/01/2020',
      createdBy: 'Avis Serrano',
      status: 'Closed',
      skills: [
        'HTNL',
        'Angular',
        'Azure'
      ],
      description: 'Esse non cillum consectetur magna cupidatat amet aliqua. Qui sit enim Lorem sit mollit ullamco et exercitation enim ipsum exercitation. Consequat exercitation voluptate anim anim cupidatat est est esse Lorem magna amet magna fugiat anim. Ipsum ut ad laborum mollit labore laboris est excepteur. Anim commodo laborum incididunt consectetur culpa nulla eiusmod amet.\r\n'
    },
    {
      id: 1100,
      title: 'UI/UX Developer',
      team: 'Amazone',
      position: 2,
      submission: 0,
      manager: 'Delacruz Ford',
      createdAt: '02/22/2020',
      updatedAt: '08/02/2020',
      createdBy: 'Mary Mcmahon',
      status: 'Closed',
      skills: [
        'C++',
        'C#',
        'Azure'
      ],
      description: 'Amet pariatur proident laboris enim dolore in ad officia. Voluptate amet eiusmod duis aliquip nostrud velit amet qui nostrud anim esse reprehenderit minim laboris. Enim labore laboris officia excepteur dolore ea cupidatat.\r\n'
    },
    {
      id: 2100,
      title: 'Software Developer',
      team: 'Amazone',
      position: 6,
      submission: 0,
      manager: 'Case Oconnor',
      createdAt: '05/31/2020',
      updatedAt: '09/05/2020',
      createdBy: 'Workman Merrill',
      status: 'Active',
      skills: [
        'JavaScript',
        'JavaScript',
        'Angular'
      ],
      description: 'Est Lorem duis aute dolor amet eiusmod dolor proident. Fugiat quis magna quis fugiat ad deserunt fugiat ut quis qui. Est sunt eiusmod aute enim. Sunt cillum veniam culpa ex in magna dolore.\r\n'
    },
    {
      id: 3100,
      title: 'BackEnd Developer',
      team: 'Microsoft',
      position: 6,
      submission: 0,
      manager: 'Alba Bird',
      createdAt: '04/21/2020',
      updatedAt: '09/09/2020',
      createdBy: 'Belinda Conway',
      status: 'Active',
      skills: [
        'React',
        'Angular',
        'Java'
      ],
      description: 'Proident labore in aliquip ullamco cupidatat nisi excepteur sunt duis cupidatat dolor voluptate ea. Ipsum sit ipsum consequat voluptate ad excepteur consectetur tempor mollit non. Esse est fugiat est nostrud mollit excepteur ad ad ullamco ullamco. Veniam in sit sint qui pariatur proident excepteur non. Magna excepteur exercitation et reprehenderit sit aliquip laboris nulla irure aute duis nulla consectetur.\r\n'
    },
    {
      id: 4100,
      title: 'BackEnd Developer',
      team: 'Google',
      position: 3,
      submission: 0,
      manager: 'Alana Cooley',
      createdAt: '12/20/2019',
      updatedAt: '08/15/2020',
      createdBy: 'Mueller Spence',
      status: 'Closed',
      skills: [
        'JavaScript',
        'Java',
        'Azure'
      ],
      description: 'Deserunt excepteur consequat et esse cupidatat eiusmod excepteur nostrud quis aliquip est est dolor id. Elit ut eu ut non labore laborum laboris exercitation laboris. Elit proident commodo deserunt veniam nostrud aliquip ipsum sunt sunt duis enim sint pariatur cupidatat. Aliqua dolore Lorem deserunt reprehenderit ullamco laboris veniam sunt.\r\n'
    },
    {
      id: 5100,
      title: 'UI/UX Developer',
      team: 'Microsoft',
      position: 2,
      submission: 0,
      manager: 'Yesenia Hughes',
      createdAt: '01/30/2020',
      updatedAt: '09/07/2020',
      createdBy: 'Woodward Dunlap',
      status: 'Active',
      skills: [
        'C++',
        'Java',
        'AWS'
      ],
      description: 'Laborum nisi aute adipisicing ex ex velit eiusmod sint incididunt quis nulla. Adipisicing id in excepteur ea mollit consequat excepteur. Id voluptate quis cillum consequat mollit non ad laboris qui dolor qui. Exercitation adipisicing incididunt voluptate laboris ullamco officia consequat consequat ad exercitation aute cillum amet. Nisi elit ut deserunt magna dolor veniam occaecat. Nostrud ad consequat nisi proident Lorem non officia.\r\n'
    },
    {
      id: 6100,
      title: 'BackEnd Developer',
      team: 'Amazone',
      position: 5,
      submission: 0,
      manager: 'Jane Cochran',
      createdAt: '05/21/2020',
      updatedAt: '09/25/2020',
      createdBy: 'Ramsey Savage',
      status: 'Closed',
      skills: [
        'Azure',
        'Angular',
        'C#'
      ],
      description: 'Non incididunt magna ut duis adipisicing qui est esse magna ipsum id laboris. Tempor minim culpa sit ex tempor velit dolore id veniam duis ad cupidatat laborum deserunt. Voluptate proident ut pariatur labore nostrud nisi consectetur sunt pariatur ipsum deserunt dolore id ea. Aute consequat consectetur velit exercitation quis dolor dolor adipisicing ea reprehenderit dolor mollit ad do.\r\n'
    },
    {
      id: 7100,
      title: 'Angular Developer',
      team: 'MS (Azure)',
      position: 5,
      submission: 0,
      manager: 'Adrian Wilson',
      createdAt: '05/03/2020',
      updatedAt: '09/14/2020',
      createdBy: 'Stone Cross',
      status: 'Closed',
      skills: [
        'Azure',
        'React',
        'Java'
      ],
      description: 'Commodo fugiat aliqua reprehenderit qui minim. Tempor deserunt eu nostrud nulla sit reprehenderit. Veniam minim elit est eu laboris voluptate minim non amet fugiat. Commodo voluptate est magna velit adipisicing id aliquip commodo esse deserunt esse consequat. Aliquip ad mollit sunt anim nostrud in aliqua id dolore. Aliqua ipsum officia nostrud irure aute consectetur labore culpa et commodo consequat esse velit. Aliqua Lorem amet eu aute deserunt mollit excepteur ipsum est aute incididunt.\r\n'
    },
    {
      id: 8100,
      title: 'BackEnd Developer',
      team: 'Amazone',
      position: 2,
      submission: 0,
      manager: 'Virgie Ingram',
      createdAt: '01/02/2020',
      updatedAt: '08/07/2020',
      createdBy: 'Delia Cash',
      status: 'Processing',
      skills: [
        'JavaScript',
        'C#',
        'AWS'
      ],
      description: 'Ea aliquip incididunt cupidatat quis. Esse sit sint laboris esse esse cupidatat veniam qui sint culpa minim. Ipsum laborum duis laboris excepteur anim do nostrud incididunt. Eiusmod enim ipsum tempor in elit aliqua ad fugiat veniam fugiat qui. Magna in occaecat officia veniam nisi sunt anim mollit. In consequat aliqua eiusmod aliquip culpa sint exercitation laboris occaecat enim.\r\n'
    },
    {
      id: 9100,
      title: 'UI/UX Developer',
      team: 'Google',
      position: 2,
      submission: 0,
      manager: 'Courtney Parker',
      createdAt: '02/14/2020',
      updatedAt: '08/16/2020',
      createdBy: 'Santiago Melendez',
      status: 'Processing',
      skills: [
        'Angular',
        'JavaScript',
        'HTNL'
      ],
      description: 'Reprehenderit cillum ex cupidatat quis cillum voluptate elit labore nulla eiusmod enim labore. Elit reprehenderit minim voluptate anim nulla Lorem ullamco ullamco do do. Sunt incididunt esse ex dolor minim non. In laborum ex fugiat aliqua velit occaecat magna nisi ad et qui do. Ipsum elit proident ut ullamco pariatur consectetur minim commodo deserunt. Laboris nostrud nisi anim culpa et ex voluptate ullamco est nostrud.\r\n'
    },
    {
      id: 10100,
      title: 'UI/UX Developer',
      team: 'Google',
      position: 2,
      submission: 0,
      manager: 'Kristi Shannon',
      createdAt: '04/30/2020',
      updatedAt: '08/21/2020',
      createdBy: 'Kathie Merritt',
      status: 'Closed',
      skills: [
        'C++',
        'JavaScript',
        'Java'
      ],
      description: 'Sunt excepteur consequat magna pariatur est proident dolor. Laborum et cupidatat consectetur cupidatat nisi. Sunt proident eu do consequat eiusmod est ullamco anim Lorem.\r\n'
    },
    {
      id: 11100,
      title: 'UI/UX Developer',
      team: 'Microsoft',
      position: 2,
      submission: 0,
      manager: 'Estelle Hodges',
      createdAt: '03/17/2020',
      updatedAt: '09/16/2020',
      createdBy: 'Shari Conley',
      status: 'Active',
      skills: [
        'Azure',
        'C++',
        'React'
      ],
      description: 'Laboris officia occaecat sint exercitation. Nostrud esse dolor ut laborum ut dolor sint pariatur ullamco. Nulla non nisi ad non commodo est adipisicing eu dolor. Officia fugiat aliqua ea consequat elit incididunt cillum quis qui voluptate nostrud duis aliquip officia. Adipisicing aliqua laborum quis veniam irure duis elit consequat. Ullamco do culpa dolor eu deserunt deserunt duis tempor. Quis in proident do nostrud quis ipsum magna est veniam magna.\r\n'
    },
    {
      id: 12100,
      title: 'Angular Developer',
      team: 'Amazone',
      position: 3,
      submission: 0,
      manager: 'Michael Soto',
      createdAt: '05/11/2020',
      updatedAt: '09/03/2020',
      createdBy: 'Lindsey Mcfadden',
      status: 'Closed',
      skills: [
        'JavaScript',
        'C++',
        'C#'
      ],
      description: 'Magna irure aliqua dolore nulla exercitation ex ad. Eu do esse nulla sit officia cupidatat adipisicing incididunt. Dolor incididunt deserunt reprehenderit fugiat reprehenderit laborum aliqua est reprehenderit id. Pariatur adipisicing sint do nulla qui consectetur minim culpa cillum velit dolor. Exercitation anim consectetur mollit magna cillum irure ut.\r\n'
    },
    {
      id: 13100,
      title: 'BackEnd Developer',
      team: 'Microsoft',
      position: 2,
      submission: 0,
      manager: 'Kasey Goodman',
      createdAt: '04/18/2020',
      updatedAt: '08/15/2020',
      createdBy: 'Hoffman Kline',
      status: 'Closed',
      skills: [
        'C#',
        'AWS',
        'HTNL'
      ],
      description: 'Officia consequat Lorem nisi cupidatat qui sunt ad duis ex. Consectetur aliqua sit voluptate fugiat incididunt. Esse mollit deserunt anim mollit ullamco sit consectetur ea aliquip cupidatat. Dolor nostrud est quis ipsum dolor elit dolor ipsum qui aute ut incididunt. Irure do dolor aliquip sint velit excepteur tempor. Ex quis commodo labore adipisicing est anim consectetur excepteur cupidatat mollit cillum. Fugiat tempor voluptate consectetur anim ipsum irure.\r\n'
    },
    {
      id: 14100,
      title: 'BackEnd Developer',
      team: 'Google',
      position: 6,
      submission: 0,
      manager: 'Lesa Hammond',
      createdAt: '02/10/2020',
      updatedAt: '09/06/2020',
      createdBy: 'Solomon Klein',
      status: 'Active',
      skills: [
        'C#',
        'Angular',
        'C++'
      ],
      description: 'Sit minim dolor aute ipsum id non tempor dolore dolor aliqua. Voluptate fugiat ea nisi ullamco et ullamco est ullamco eu. Voluptate labore nulla veniam deserunt qui sunt duis enim tempor non pariatur consequat. Lorem exercitation pariatur Lorem elit laboris magna officia. Amet nostrud cupidatat reprehenderit sit minim excepteur. Aute et veniam ad irure est laboris.\r\n'
    },
    {
      id: 15100,
      title: 'BackEnd Developer',
      team: 'MS (Azure)',
      position: 2,
      submission: 0,
      manager: 'Billie Mccullough',
      createdAt: '03/08/2020',
      updatedAt: '08/12/2020',
      createdBy: 'Wilma Gallegos',
      status: 'Active',
      skills: [
        'React',
        'HTNL',
        'AWS'
      ],
      description: 'Irure officia pariatur cillum pariatur sunt occaecat do laborum irure elit sit cupidatat et et. Non sunt cillum deserunt culpa ea aute veniam laborum non sint sunt dolor. Culpa culpa cupidatat qui fugiat nostrud veniam pariatur. Esse ut exercitation consequat deserunt consequat laborum do Lorem occaecat do. Cupidatat qui ullamco ipsum irure sunt excepteur deserunt deserunt ex elit ipsum ea ea sunt. Et proident aliqua elit mollit occaecat irure id irure adipisicing do. Ipsum consequat laboris enim in magna enim laboris voluptate laborum proident eu consequat.\r\n'
    },
    {
      id: 16100,
      title: 'Web Developer',
      team: 'Microsoft',
      position: 6,
      submission: 0,
      manager: 'Farmer Sanford',
      createdAt: '12/31/2019',
      updatedAt: '08/01/2020',
      createdBy: 'Rebecca Mullins',
      status: 'Closed',
      skills: [
        'React',
        'HTNL',
        'Azure'
      ],
      description: 'Duis in incididunt aliquip irure. Exercitation ex est aliquip proident nisi adipisicing aliqua laborum. Ad culpa ipsum est adipisicing aliqua officia dolor amet consectetur mollit velit. Et ad dolor enim minim elit anim. Do ut fugiat cupidatat nostrud occaecat dolore ullamco aliqua. Deserunt ea ipsum anim esse mollit fugiat sint. Non minim minim ex Lorem dolore anim non nulla culpa fugiat tempor esse in.\r\n'
    },
    {
      id: 17100,
      title: 'BackEnd Developer',
      team: 'Microsoft',
      position: 2,
      submission: 0,
      manager: 'Poole Mccall',
      createdAt: '06/29/2020',
      updatedAt: '08/10/2020',
      createdBy: 'Walsh Sykes',
      status: 'Closed',
      skills: [
        'HTNL',
        'Java',
        'AWS'
      ],
      description: 'Esse et consectetur in nulla. Laborum cupidatat duis aliquip exercitation non officia. Nisi dolore non qui anim Lorem aliqua dolor ut cillum. Aute anim dolor consectetur sint commodo cillum sunt sint labore non sint eu veniam. Occaecat irure deserunt occaecat anim voluptate id nulla cupidatat.\r\n'
    },
    {
      id: 18100,
      title: 'Web Developer',
      team: 'Amazone',
      position: 6,
      submission: 0,
      manager: 'Ernestine Mcdonald',
      createdAt: '03/30/2020',
      updatedAt: '08/01/2020',
      createdBy: 'Bertha Vargas',
      status: 'Processing',
      skills: [
        'HTNL',
        'Azure',
        'C++'
      ],
      description: 'Voluptate consectetur proident aliquip qui consectetur amet cillum labore ad sit. Officia ut id eu dolor. Ex cillum ad irure fugiat exercitation elit ea nostrud laborum consequat labore non officia. Nulla dolore anim ullamco veniam. Est sunt voluptate nulla quis deserunt occaecat tempor ullamco duis. Occaecat amet eu et consequat ipsum duis minim quis ad minim.\r\n'
    },
    {
      id: 19100,
      title: 'Web Developer',
      team: 'MS (Azure)',
      position: 6,
      submission: 0,
      manager: 'Sonja Wilder',
      createdAt: '06/22/2020',
      updatedAt: '09/20/2020',
      createdBy: 'Wood Donaldson',
      status: 'Processing',
      skills: [
        'C++',
        'C++',
        'HTNL'
      ],
      description: 'Qui nisi proident occaecat excepteur velit elit quis ex excepteur dolor nisi aute ipsum. Dolor laborum proident tempor ea magna adipisicing aliquip tempor do. Ut irure Lorem cupidatat cupidatat irure reprehenderit in tempor qui ullamco. Cupidatat duis proident minim laboris exercitation fugiat minim consequat dolor in est. Proident exercitation ut sunt deserunt est. Sint reprehenderit dolore nisi ullamco minim aliqua in elit consequat mollit occaecat quis eu. Anim ad magna adipisicing et nostrud elit adipisicing ullamco minim qui excepteur culpa anim.\r\n'
    },
    {
      id: 20100,
      title: 'Angular Developer',
      team: 'Microsoft',
      position: 5,
      submission: 0,
      manager: 'Kate Rocha',
      createdAt: '03/06/2020',
      updatedAt: '08/20/2020',
      createdBy: 'Sparks Thornton',
      status: 'Processing',
      skills: [
        'JavaScript',
        'Angular',
        'JavaScript'
      ],
      description: 'Lorem labore esse non cillum magna ut duis ut ullamco aliquip do. Adipisicing minim laboris ipsum ad laborum id. Consectetur ut deserunt duis qui elit aliquip minim. Ullamco cupidatat anim dolor cillum deserunt.\r\n'
    },
    {
      id: 21100,
      title: 'Software Developer',
      team: 'Microsoft',
      position: 5,
      submission: 0,
      manager: 'Valarie Farmer',
      createdAt: '06/10/2020',
      updatedAt: '08/14/2020',
      createdBy: 'Owen Bauer',
      status: 'Closed',
      skills: [
        'C#',
        'C++',
        'Azure'
      ],
      description: 'Sunt irure culpa sunt sint do qui anim laborum. Incididunt dolore commodo irure veniam officia. Magna fugiat mollit cupidatat do duis nisi incididunt excepteur voluptate dolor pariatur. Qui reprehenderit non id veniam non esse proident veniam.\r\n'
    },
    {
      id: 22100,
      title: 'UI/UX Developer',
      team: 'MS (Azure)',
      position: 2,
      submission: 0,
      manager: 'Sylvia Charles',
      createdAt: '05/04/2020',
      updatedAt: '08/18/2020',
      createdBy: 'Lacy Nicholson',
      status: 'Closed',
      skills: [
        'Azure',
        'React',
        'C#'
      ],
      description: 'Reprehenderit anim aute ullamco anim voluptate. Ullamco officia aute laborum reprehenderit amet commodo excepteur deserunt. Veniam eu exercitation et consectetur ipsum magna. Irure incididunt veniam proident ex cillum pariatur aliqua incididunt occaecat. Eiusmod ipsum Lorem enim et ipsum Lorem eu ullamco tempor reprehenderit. Excepteur voluptate laboris commodo deserunt est sint cillum.\r\n'
    },
    {
      id: 23100,
      title: 'Web Developer',
      team: 'MS (Azure)',
      position: 5,
      submission: 0,
      manager: 'Flossie Cook',
      createdAt: '04/20/2020',
      updatedAt: '09/28/2020',
      createdBy: 'Rose Armstrong',
      status: 'Active',
      skills: [
        'C++',
        'JavaScript',
        'HTNL'
      ],
      description: 'Cillum commodo adipisicing exercitation nostrud est et. Duis consequat culpa eiusmod id consectetur ipsum commodo amet duis aliqua irure consectetur ullamco veniam. Adipisicing Lorem adipisicing magna quis id dolor mollit duis do enim dolore duis. Elit dolore occaecat mollit magna incididunt tempor fugiat aliquip proident. Minim labore mollit reprehenderit adipisicing velit.\r\n'
    },
    {
      id: 24100,
      title: 'Angular Developer',
      team: 'MS (Azure)',
      position: 2,
      submission: 0,
      manager: 'Jody Tanner',
      createdAt: '03/24/2020',
      updatedAt: '09/23/2020',
      createdBy: 'Cohen Booth',
      status: 'Active',
      skills: [
        'Java',
        'React',
        'HTNL'
      ],
      description: 'Exercitation ut fugiat velit est cupidatat aute id quis ad in. Sint Lorem elit do cupidatat dolor commodo consequat deserunt velit. Officia nostrud consectetur eiusmod magna commodo minim aute nulla Lorem commodo.\r\n'
    },
    {
      id: 25100,
      title: 'Web Developer',
      team: 'Amazone',
      position: 2,
      submission: 0,
      manager: 'Lydia Jennings',
      createdAt: '07/04/2020',
      updatedAt: '09/08/2020',
      createdBy: 'Jillian Campbell',
      status: 'Processing',
      skills: [
        'Java',
        'Angular',
        'Angular'
      ],
      description: 'Ad irure ut ad do dolore et pariatur. Elit sint eiusmod ea cillum voluptate id non amet. Sint et voluptate nostrud officia minim id laboris. Eiusmod laborum sunt mollit ut consequat amet adipisicing ullamco veniam voluptate dolor magna. Dolor ipsum veniam exercitation eu tempor.\r\n'
    },
    {
      id: 26100,
      title: 'React Developer',
      team: 'Microsoft',
      position: 6,
      submission: 0,
      manager: 'Armstrong Patrick',
      createdAt: '05/10/2020',
      updatedAt: '08/19/2020',
      createdBy: 'Blackburn Lowery',
      status: 'Active',
      skills: [
        'React',
        'HTNL',
        'AWS'
      ],
      description: 'Sunt incididunt exercitation exercitation amet. Est incididunt anim non culpa. Aute consectetur nostrud incididunt dolore sunt. Nisi Lorem laborum quis aliquip incididunt mollit veniam. Dolor ipsum sit proident et veniam laborum cillum non exercitation duis commodo duis. Minim eu in velit qui tempor.\r\n'
    },
    {
      id: 27100,
      title: 'UI/UX Developer',
      team: 'Google',
      position: 6,
      submission: 0,
      manager: 'Jackie Freeman',
      createdAt: '07/29/2020',
      updatedAt: '08/20/2020',
      createdBy: 'Merle Aguirre',
      status: 'Processing',
      skills: [
        'C#',
        'HTNL',
        'React'
      ],
      description: 'Velit laboris aute velit do nostrud deserunt nulla. Est esse irure quis sit minim est reprehenderit labore non laboris ex eu. Velit exercitation tempor anim occaecat cillum sunt ullamco. Ea ipsum ullamco ullamco commodo sunt exercitation ut ea adipisicing dolor. Fugiat qui consectetur aliqua magna ex ad sint. Magna dolore exercitation Lorem nostrud anim enim labore adipisicing ipsum tempor. Minim eu nulla elit commodo.\r\n'
    },
    {
      id: 28100,
      title: 'React Developer',
      team: 'Amazone',
      position: 2,
      submission: 0,
      manager: 'Wells Terrell',
      createdAt: '03/25/2020',
      updatedAt: '08/07/2020',
      createdBy: 'Houston Farrell',
      status: 'Closed',
      skills: [
        'JavaScript',
        'JavaScript',
        'React'
      ],
      description: 'Magna consectetur elit elit qui officia. Commodo eiusmod proident deserunt nostrud dolore dolor. Nisi id sit ex ea. Ullamco Lorem labore deserunt sit ea consequat esse labore exercitation aliqua ipsum proident nostrud. Proident amet velit amet laboris nisi culpa sit ut duis ad laboris.\r\n'
    },
    {
      id: 29100,
      title: 'BackEnd Developer',
      team: 'Google',
      position: 3,
      submission: 0,
      manager: 'Joseph Obrien',
      createdAt: '04/24/2020',
      updatedAt: '09/02/2020',
      createdBy: 'Prince Schmidt',
      status: 'Closed',
      skills: [
        'Angular',
        'Azure',
        'JavaScript'
      ],
      description: 'Voluptate mollit duis ex dolor occaecat est nostrud exercitation. Aliquip quis commodo nulla irure cillum labore nisi aliqua irure cillum magna aute id. Sit incididunt eiusmod sunt excepteur consectetur aliqua anim mollit velit minim duis fugiat eu esse. Esse adipisicing enim velit Lorem.\r\n'
    },
    {
      id: 30100,
      title: 'Software Developer',
      team: 'Microsoft',
      position: 3,
      submission: 0,
      manager: 'Mallory Hebert',
      createdAt: '03/27/2020',
      updatedAt: '08/29/2020',
      createdBy: 'Morales Jackson',
      status: 'Processing',
      skills: [
        'Azure',
        'React',
        'JavaScript'
      ],
      description: 'Culpa velit tempor amet exercitation elit dolor est aliqua voluptate enim pariatur nostrud sit. Do quis est occaecat laboris commodo. Laboris nulla quis amet proident. Eiusmod in fugiat tempor incididunt voluptate labore cillum occaecat quis reprehenderit commodo cillum reprehenderit do. Sunt irure qui proident pariatur consectetur sunt cillum. Aliquip ad ex dolor sunt culpa aliqua exercitation anim elit. Proident ex eu mollit cillum aliquip irure adipisicing.\r\n'
    },
    {
      id: 31100,
      title: 'React Developer',
      team: 'MS (Azure)',
      position: 6,
      submission: 0,
      manager: 'Meghan Miller',
      createdAt: '05/13/2020',
      updatedAt: '08/30/2020',
      createdBy: 'Marguerite Howe',
      status: 'Closed',
      skills: [
        'HTNL',
        'HTNL',
        'Angular'
      ],
      description: 'Duis velit officia quis dolor tempor ut. Ipsum ea exercitation commodo aute elit Lorem officia esse voluptate et. Ullamco magna adipisicing consequat do. Consectetur non eiusmod laborum est velit consequat quis. Dolor ut sunt consequat tempor ullamco do anim aliqua pariatur eu nisi veniam qui mollit. Fugiat nulla non aliqua nulla qui duis est ea labore nulla dolore id sit. Et elit enim qui consequat in incididunt exercitation eiusmod ullamco.\r\n'
    },
    {
      id: 32100,
      title: 'React Developer',
      team: 'Amazone',
      position: 5,
      submission: 0,
      manager: 'Cross Pace',
      createdAt: '06/20/2020',
      updatedAt: '08/23/2020',
      createdBy: 'Barnett Johnson',
      status: 'Active',
      skills: [
        'Java',
        'Java',
        'C#'
      ],
      description: 'Eiusmod non adipisicing anim labore commodo voluptate consequat anim commodo adipisicing culpa ex. Officia incididunt excepteur proident sunt duis excepteur. Esse deserunt deserunt qui id labore ut Lorem anim anim non adipisicing. Aliqua ex velit Lorem proident commodo incididunt minim veniam et ea ut. Pariatur ipsum commodo culpa velit esse enim. Enim voluptate cillum in ipsum Lorem irure non.\r\n'
    },
    {
      id: 33100,
      title: 'Software Developer',
      team: 'MS (Azure)',
      position: 5,
      submission: 0,
      manager: 'Sheila Valentine',
      createdAt: '06/25/2020',
      updatedAt: '08/24/2020',
      createdBy: 'Pollard Pickett',
      status: 'Closed',
      skills: [
        'Java',
        'C#',
        'React'
      ],
      description: 'Ad minim in est sunt ullamco aliqua laborum ex minim consequat commodo cupidatat. Aute qui cillum excepteur eiusmod culpa excepteur nisi irure officia officia deserunt duis occaecat voluptate. Laborum amet reprehenderit esse dolor aliquip. Aute laboris id magna magna dolore enim ad commodo incididunt incididunt veniam. Et dolore do laborum amet et.\r\n'
    },
    {
      id: 34100,
      title: 'BackEnd Developer',
      team: 'Google',
      position: 6,
      submission: 0,
      manager: 'Dee Tyler',
      createdAt: '05/27/2020',
      updatedAt: '08/10/2020',
      createdBy: 'Wolfe Skinner',
      status: 'Active',
      skills: [
        'JavaScript',
        'Angular',
        'Angular'
      ],
      description: 'Enim laborum deserunt non nulla incididunt nostrud labore. Sunt ut consectetur laborum minim nisi. Esse tempor aute sit nostrud adipisicing esse consectetur ad ea enim. Eu nulla qui mollit non sint reprehenderit dolore magna amet irure et minim. Esse elit occaecat magna officia.\r\n'
    },
    {
      id: 35100,
      title: 'Software Developer',
      team: 'Microsoft',
      position: 3,
      submission: 0,
      manager: 'Lesley Velez',
      createdAt: '12/23/2019',
      updatedAt: '08/20/2020',
      createdBy: 'Lela Reese',
      status: 'Active',
      skills: [
        'Java',
        'C#',
        'C++'
      ],
      description: 'Nulla ut nulla eu sit aute duis laborum adipisicing dolor magna nulla magna ex. Voluptate velit aute pariatur pariatur culpa do ullamco proident. Cillum id deserunt commodo quis et sit irure. Minim officia in est non in non do qui nisi ad esse consequat consectetur. In veniam dolor non sit et cillum sint eiusmod incididunt.\r\n'
    },
    {
      id: 36100,
      title: 'Web Developer',
      team: 'Amazone',
      position: 6,
      submission: 0,
      manager: 'Florine Jordan',
      createdAt: '12/17/2019',
      updatedAt: '09/22/2020',
      createdBy: 'Earlene Fitzpatrick',
      status: 'Active',
      skills: [
        'C++',
        'Azure',
        'Azure'
      ],
      description: 'Cupidatat aliquip voluptate tempor aute. Dolor in exercitation ullamco duis consequat sunt nulla cillum labore aute exercitation anim incididunt quis. Cillum do est magna officia officia labore minim do labore tempor tempor. Magna nulla minim proident occaecat consectetur adipisicing enim do tempor sit aliqua deserunt. Pariatur ut ullamco cupidatat magna duis sit in. Reprehenderit mollit velit aliquip non qui nostrud dolor do.\r\n'
    },
    {
      id: 37100,
      title: 'BackEnd Developer',
      team: 'MS (Azure)',
      position: 3,
      submission: 0,
      manager: 'Cheri Rose',
      createdAt: '12/29/2019',
      updatedAt: '09/25/2020',
      createdBy: 'Curry Brady',
      status: 'Closed',
      skills: [
        'C#',
        'C++',
        'JavaScript'
      ],
      description: 'Nulla duis amet ad deserunt officia occaecat ea in aute eu enim. Voluptate do excepteur consectetur irure excepteur nostrud magna laboris pariatur. Excepteur sit tempor laboris qui dolor amet commodo aliquip Lorem culpa. Ullamco officia laboris ea eu fugiat pariatur officia dolore dolore tempor voluptate dolor commodo. Adipisicing exercitation sint est ea sint velit ut cillum voluptate elit consectetur culpa consequat laboris. Nisi aliqua in elit consectetur eiusmod aliquip nisi. Est ad reprehenderit minim cillum.\r\n'
    },
    {
      id: 38100,
      title: 'Angular Developer',
      team: 'Microsoft',
      position: 3,
      submission: 0,
      manager: 'Charles Yates',
      createdAt: '01/25/2020',
      updatedAt: '08/24/2020',
      createdBy: 'Lorie Morrow',
      status: 'Active',
      skills: [
        'C++',
        'C#',
        'HTNL'
      ],
      description: 'Occaecat eu nulla ad sint quis fugiat aliqua do et in nisi ut deserunt laboris. Lorem est quis elit ullamco eu ullamco mollit sint elit ad occaecat esse. Anim aliquip ullamco ex amet. Sunt adipisicing nulla ea et elit reprehenderit commodo magna.\r\n'
    },
    {
      id: 39100,
      title: 'Angular Developer',
      team: 'Google',
      position: 3,
      submission: 0,
      manager: 'Lea Patel',
      createdAt: '12/26/2019',
      updatedAt: '09/02/2020',
      createdBy: 'Emerson Peck',
      status: 'Active',
      skills: [
        'JavaScript',
        'C#',
        'HTNL'
      ],
      description: 'Deserunt minim ad voluptate nostrud. Incididunt nulla pariatur anim nulla sit sunt velit cupidatat minim sint consequat excepteur elit. Nostrud commodo cupidatat dolore amet Lorem minim amet magna laboris voluptate excepteur aute officia veniam. Est non proident labore ad velit in quis enim incididunt in exercitation elit veniam incididunt. Nisi anim eiusmod mollit fugiat Lorem incididunt proident.\r\n'
    },
    {
      id: 40100,
      title: 'React Developer',
      team: 'Microsoft',
      position: 6,
      submission: 0,
      manager: 'Ericka English',
      createdAt: '05/14/2020',
      updatedAt: '08/17/2020',
      createdBy: 'Maura Woodward',
      status: 'Processing',
      skills: [
        'Azure',
        'React',
        'Java'
      ],
      description: 'Aute ipsum ut velit ipsum sunt in excepteur cupidatat ex ipsum labore amet duis. Nostrud commodo ut laboris adipisicing Lorem. Laboris ipsum ut labore ullamco irure exercitation do excepteur laboris. Laborum laborum pariatur incididunt sint Lorem culpa consectetur est quis excepteur do mollit quis aliquip. Minim veniam occaecat do labore Lorem. Exercitation nisi eu incididunt occaecat duis fugiat esse consequat ex duis tempor incididunt veniam aute. Dolore consequat ut elit ut dolore et mollit consequat consectetur minim proident ullamco enim occaecat.\r\n'
    },
    {
      id: 41100,
      title: 'BackEnd Developer',
      team: 'Amazone',
      position: 2,
      submission: 0,
      manager: 'Maryann Adams',
      createdAt: '04/18/2020',
      updatedAt: '09/20/2020',
      createdBy: 'Cooper Gay',
      status: 'Active',
      skills: [
        'C#',
        'C++',
        'C#'
      ],
      description: 'Duis aute incididunt voluptate esse irure excepteur. Qui culpa ut magna occaecat voluptate proident dolor ex irure eiusmod aliqua eu. Nostrud ipsum laborum irure nisi consectetur proident et. Officia ipsum consequat ad in eiusmod sit voluptate aliquip amet pariatur incididunt amet irure ipsum. Consequat qui eiusmod pariatur ex est eiusmod exercitation est deserunt anim mollit. Aliquip laborum ullamco ipsum duis veniam. Duis sit ullamco dolore officia.\r\n'
    },
    {
      id: 42100,
      title: 'UI/UX Developer',
      team: 'MS (Azure)',
      position: 6,
      submission: 0,
      manager: 'Twila Evans',
      createdAt: '07/04/2020',
      updatedAt: '08/05/2020',
      createdBy: 'Becker Dotson',
      status: 'Active',
      skills: [
        'JavaScript',
        'JavaScript',
        'C++'
      ],
      description: 'Irure tempor mollit magna officia ut incididunt. Mollit in aute sit dolor eu commodo occaecat et incididunt laborum. Fugiat consectetur anim ut consequat voluptate enim nulla nulla aliquip. Nostrud consequat adipisicing ea ea ullamco officia. Ut duis nisi eiusmod sit ullamco ut amet.\r\n'
    },
    {
      id: 43100,
      title: 'BackEnd Developer',
      team: 'MS (Azure)',
      position: 5,
      submission: 0,
      manager: 'Lidia Calderon',
      createdAt: '06/22/2020',
      updatedAt: '08/05/2020',
      createdBy: 'Daniels Morse',
      status: 'Active',
      skills: [
        'JavaScript',
        'Java',
        'Angular'
      ],
      description: 'Commodo cupidatat anim ad magna excepteur aliqua nulla. Cillum deserunt ipsum tempor anim ullamco aliquip do id cillum. Eu in dolore et sunt est tempor adipisicing est esse laborum consectetur. Proident ullamco fugiat dolor officia velit aliquip officia est in exercitation ad. Adipisicing reprehenderit cillum id proident proident nostrud mollit aliquip consectetur eiusmod deserunt officia. Consectetur amet ad tempor dolor nisi cupidatat fugiat magna adipisicing amet enim excepteur consequat. Qui labore do deserunt enim sint velit eiusmod velit ea.\r\n'
    },
    {
      id: 44100,
      title: 'React Developer',
      team: 'Amazone',
      position: 5,
      submission: 0,
      manager: 'Nina Trujillo',
      createdAt: '07/18/2020',
      updatedAt: '09/17/2020',
      createdBy: 'Mona Pratt',
      status: 'Active',
      skills: [
        'AWS',
        'C++',
        'C++'
      ],
      description: 'Anim irure minim ullamco irure commodo aliquip sint fugiat dolor occaecat cupidatat anim voluptate. Cillum velit Lorem consectetur ea. Fugiat do ullamco aute incididunt Lorem dolor ex non occaecat qui sint cupidatat ullamco esse.\r\n'
    },
    {
      id: 45100,
      title: 'BackEnd Developer',
      team: 'Microsoft',
      position: 2,
      submission: 0,
      manager: 'Delaney Moran',
      createdAt: '12/23/2019',
      updatedAt: '09/17/2020',
      createdBy: 'Merrill Sloan',
      status: 'Closed',
      skills: [
        'AWS',
        'HTNL',
        'C++'
      ],
      description: 'Labore cillum mollit voluptate amet amet est ipsum exercitation do esse incididunt Lorem. Occaecat fugiat sunt dolore quis anim sint commodo eiusmod ut laboris laboris eiusmod sint. Ullamco et ex proident commodo consequat duis incididunt excepteur velit nisi duis. Minim eiusmod ea Lorem minim magna culpa. Ea labore aliqua officia mollit ipsum quis in reprehenderit veniam et amet minim tempor. Elit eu mollit mollit commodo.\r\n'
    },
    {
      id: 46100,
      title: 'React Developer',
      team: 'Microsoft',
      position: 6,
      submission: 0,
      manager: 'Louise Rojas',
      createdAt: '01/10/2020',
      updatedAt: '09/28/2020',
      createdBy: 'Callie Barry',
      status: 'Active',
      skills: [
        'C++',
        'C++',
        'React'
      ],
      description: 'Lorem adipisicing adipisicing ad enim voluptate exercitation est laborum do officia amet mollit. Sunt sunt velit fugiat sint ex officia consequat id id anim. Commodo commodo duis do et nisi nulla nostrud laborum laboris cillum ex. Ex cillum cillum sunt aliquip voluptate quis fugiat culpa nostrud exercitation. Exercitation aliquip officia reprehenderit laboris elit aliqua ipsum sit aliquip velit voluptate enim.\r\n'
    },
    {
      id: 47100,
      title: 'Web Developer',
      team: 'Google',
      position: 6,
      submission: 0,
      manager: 'Hyde Johns',
      createdAt: '01/18/2020',
      updatedAt: '08/11/2020',
      createdBy: 'Hays Moses',
      status: 'Closed',
      skills: [
        'Angular',
        'C#',
        'JavaScript'
      ],
      description: 'Ipsum dolore do nisi ut duis in proident anim amet ipsum mollit est fugiat commodo. Eu nostrud ut aute minim. Proident id tempor proident elit fugiat velit quis occaecat laboris ea ut ut. Nostrud Lorem do magna adipisicing irure ad aute ad ipsum mollit. Nulla quis reprehenderit reprehenderit voluptate elit. Minim aliqua nostrud ea et nisi eiusmod enim ipsum officia anim veniam nostrud magna.\r\n'
    },
    {
      id: 48100,
      title: 'Angular Developer',
      team: 'MS (Azure)',
      position: 5,
      submission: 0,
      manager: 'Lois Cummings',
      createdAt: '06/19/2020',
      updatedAt: '09/10/2020',
      createdBy: 'Rush Weiss',
      status: 'Closed',
      skills: [
        'C#',
        'React',
        'JavaScript'
      ],
      description: 'Dolore ex culpa Lorem commodo ipsum dolore nulla consectetur ut aliquip elit fugiat Lorem. Commodo sunt deserunt ea aute cillum fugiat quis amet veniam consectetur dolore minim occaecat dolore. Officia in eu ullamco ullamco ullamco qui mollit esse. Id nisi fugiat officia fugiat irure ad consectetur mollit. Consectetur qui est non consequat quis incididunt culpa pariatur id cupidatat ut fugiat. Tempor excepteur consequat dolore proident qui aliquip qui in.\r\n'
    },
    {
      id: 49100,
      title: 'UI/UX Developer',
      team: 'MS (Azure)',
      position: 6,
      submission: 0,
      manager: 'Palmer Norton',
      createdAt: '07/09/2020',
      updatedAt: '08/10/2020',
      createdBy: 'Vera Marshall',
      status: 'Closed',
      skills: [
        'AWS',
        'React',
        'React'
      ],
      description: 'Laborum quis consequat magna nulla irure commodo eiusmod ut Lorem in velit et enim. Mollit mollit velit nulla in aute cillum elit culpa ad aute deserunt laboris aute. Ex culpa adipisicing anim aliqua ullamco. Deserunt adipisicing aute et laborum cupidatat exercitation. Aliquip sint nostrud irure ipsum laboris enim. Aliquip aliquip occaecat consequat consectetur. Dolor dolore non minim tempor ipsum reprehenderit veniam.\r\n'
    },
    {
      id: 50100,
      title: 'Web Developer',
      team: 'Amazone',
      position: 2,
      submission: 0,
      manager: 'Zimmerman Ferguson',
      createdAt: '12/06/2019',
      updatedAt: '09/08/2020',
      createdBy: 'Gabriela Newton',
      status: 'Processing',
      skills: [
        'Java',
        'AWS',
        'JavaScript'
      ],
      description: 'Occaecat magna eu cillum voluptate proident qui ex officia dolor et. Ipsum ut mollit sint consequat aliquip adipisicing consectetur ad laborum ullamco sit cupidatat ut deserunt. Laboris ipsum laboris fugiat adipisicing pariatur sit labore reprehenderit est. Ipsum proident sit incididunt elit qui ex irure cillum in adipisicing anim veniam aute culpa. Esse culpa officia ullamco officia eiusmod anim.\r\n'
    },
    {
      id: 51100,
      title: 'UI/UX Developer',
      team: 'Amazone',
      position: 2,
      submission: 0,
      manager: 'Olson Hooper',
      createdAt: '03/08/2020',
      updatedAt: '08/23/2020',
      createdBy: 'Aline Dodson',
      status: 'Active',
      skills: [
        'Angular',
        'C#',
        'HTNL'
      ],
      description: 'Culpa voluptate eu est ex sint non. Nostrud adipisicing ullamco occaecat ex labore velit qui voluptate velit consectetur fugiat labore. Proident quis labore nulla sit. Voluptate reprehenderit amet esse fugiat eu ipsum pariatur.\r\n'
    },
    {
      id: 52100,
      title: 'Software Developer',
      team: 'Amazone',
      position: 2,
      submission: 0,
      manager: 'Clarice York',
      createdAt: '04/22/2020',
      updatedAt: '09/03/2020',
      createdBy: 'Marisol Hull',
      status: 'Active',
      skills: [
        'JavaScript',
        'HTNL',
        'AWS'
      ],
      description: 'Exercitation qui in et sit culpa et minim et sint veniam qui anim nulla pariatur. Enim dolor sunt veniam velit laboris excepteur nulla minim incididunt culpa voluptate velit ea veniam. Aute laborum irure fugiat consequat sunt sit ad velit eiusmod.\r\n'
    },
    {
      id: 53100,
      title: 'React Developer',
      team: 'Microsoft',
      position: 2,
      submission: 0,
      manager: 'Lawrence Stevens',
      createdAt: '03/03/2020',
      updatedAt: '08/26/2020',
      createdBy: 'Watkins Marsh',
      status: 'Closed',
      skills: [
        'C#',
        'Angular',
        'HTNL'
      ],
      description: 'Excepteur dolor laboris proident quis esse ex esse sint nostrud adipisicing id qui eu consectetur. Lorem nulla consectetur do anim id irure sunt sint adipisicing velit commodo ea. Nostrud qui deserunt tempor dolore est quis proident ex. Consectetur quis enim dolor qui aliquip est laborum quis Lorem et reprehenderit aute sunt sit. Aliqua mollit elit et laboris dolore elit nostrud id incididunt. Deserunt voluptate do ut laborum sit nostrud.\r\n'
    },
    {
      id: 54100,
      title: 'Web Developer',
      team: 'Amazone',
      position: 6,
      submission: 0,
      manager: 'Vega Franks',
      createdAt: '05/24/2020',
      updatedAt: '08/27/2020',
      createdBy: 'Tucker Underwood',
      status: 'Processing',
      skills: [
        'C#',
        'React',
        'Azure'
      ],
      description: 'Commodo sit voluptate aute magna do incididunt cillum enim qui labore quis amet pariatur et. Incididunt nisi nisi officia exercitation dolor sint ea enim nisi voluptate irure magna mollit pariatur. Consequat aute sint excepteur excepteur excepteur. Quis nulla eu ex sint minim ea consectetur voluptate sunt et labore. Dolor laboris ullamco occaecat id proident labore aliquip officia non dolore in laboris cupidatat. Elit excepteur reprehenderit nostrud id proident ipsum dolore aute. Fugiat Lorem magna labore consequat tempor.\r\n'
    },
    {
      id: 55100,
      title: 'Web Developer',
      team: 'Microsoft',
      position: 2,
      submission: 0,
      manager: 'Faith Mathis',
      createdAt: '03/08/2020',
      updatedAt: '08/18/2020',
      createdBy: 'Imogene Larsen',
      status: 'Processing',
      skills: [
        'Angular',
        'JavaScript',
        'HTNL'
      ],
      description: 'Labore id quis fugiat cillum consequat excepteur dolore minim velit eiusmod qui anim exercitation. Laborum veniam eu in mollit voluptate excepteur ut sit ea exercitation voluptate. Exercitation et id anim aliquip sunt officia nulla cupidatat nostrud pariatur veniam. Sint id aliquip ex elit labore adipisicing commodo officia voluptate. Reprehenderit dolor excepteur voluptate esse nisi in ut incididunt eiusmod aute eu sit ullamco enim. Dolore duis fugiat mollit ipsum quis officia in culpa culpa sunt excepteur cillum consequat. Dolor adipisicing culpa do ad esse nisi laborum sint minim amet laboris amet do.\r\n'
    },
    {
      id: 56100,
      title: 'React Developer',
      team: 'Google',
      position: 5,
      submission: 0,
      manager: 'Whitaker Sharpe',
      createdAt: '07/23/2020',
      updatedAt: '09/13/2020',
      createdBy: 'Benson Gray',
      status: 'Closed',
      skills: [
        'HTNL',
        'C#',
        'Angular'
      ],
      description: 'Dolore est in consectetur tempor adipisicing laborum ut esse excepteur eu duis commodo. Velit labore mollit amet sint consequat laboris. Ad qui aute labore id minim proident ex quis ut aute ut occaecat. Labore excepteur enim nostrud ad do voluptate duis aute esse aliqua. Anim proident sint sint incididunt consequat ex nisi. Exercitation exercitation pariatur consequat tempor labore aliqua magna reprehenderit minim tempor do dolore.\r\n'
    },
    {
      id: 57100,
      title: 'UI/UX Developer',
      team: 'MS (Azure)',
      position: 6,
      submission: 0,
      manager: 'Paige Jacobson',
      createdAt: '12/03/2019',
      updatedAt: '09/09/2020',
      createdBy: 'Miranda Elliott',
      status: 'Active',
      skills: [
        'AWS',
        'C#',
        'Azure'
      ],
      description: 'Tempor quis ex in ex quis sint ex dolor et. Cillum Lorem dolor occaecat reprehenderit magna exercitation. Eu aliquip irure proident eiusmod ad minim in dolore nulla proident commodo. Enim cillum cupidatat reprehenderit laborum laboris.\r\n'
    },
    {
      id: 58100,
      title: 'Web Developer',
      team: 'Amazone',
      position: 3,
      submission: 0,
      manager: 'Macias Faulkner',
      createdAt: '06/14/2020',
      updatedAt: '09/06/2020',
      createdBy: 'Myers Pate',
      status: 'Active',
      skills: [
        'React',
        'AWS',
        'Java'
      ],
      description: 'Exercitation Lorem proident duis consequat magna cupidatat cupidatat consectetur reprehenderit excepteur magna sit. Pariatur ad labore excepteur cupidatat. Minim veniam ipsum exercitation adipisicing velit veniam culpa do Lorem.\r\n'
    },
    {
      id: 59100,
      title: 'UI/UX Developer',
      team: 'Amazone',
      position: 6,
      submission: 0,
      manager: 'Cook Chandler',
      createdAt: '05/08/2020',
      updatedAt: '08/12/2020',
      createdBy: 'Coleen Short',
      status: 'Closed',
      skills: [
        'HTNL',
        'React',
        'C++'
      ],
      description: 'Elit est sint commodo laborum ex et cillum ipsum irure elit velit. Cupidatat eu fugiat incididunt proident sit duis proident dolore anim do. Ad sit occaecat mollit commodo veniam aliquip ullamco nulla enim cupidatat amet qui occaecat eiusmod. Officia ipsum exercitation id minim nulla deserunt magna exercitation quis in ut. Consectetur veniam in excepteur veniam laboris cupidatat proident id pariatur ex enim ea.\r\n'
    },
    {
      id: 60100,
      title: 'BackEnd Developer',
      team: 'Microsoft',
      position: 2,
      submission: 0,
      manager: 'Beryl Atkinson',
      createdAt: '04/15/2020',
      updatedAt: '08/06/2020',
      createdBy: 'Howard Rivers',
      status: 'Active',
      skills: [
        'C++',
        'JavaScript',
        'Angular'
      ],
      description: 'Ex esse dolore enim adipisicing aliqua. Qui incididunt nostrud pariatur labore quis dolor ut ipsum elit sit dolor mollit. Ex esse esse ipsum culpa. Qui laborum in voluptate id sunt duis esse et duis ea. Esse non laborum occaecat tempor dolore anim occaecat mollit tempor dolor officia id. Ex consequat aliquip exercitation adipisicing fugiat tempor incididunt eiusmod velit culpa sint ea eu. Ipsum ut quis anim veniam non amet laboris incididunt occaecat do laborum aute in excepteur.\r\n'
    },
    {
      id: 61100,
      title: 'Software Developer',
      team: 'Google',
      position: 3,
      submission: 0,
      manager: 'Bernadine Bradford',
      createdAt: '05/12/2020',
      updatedAt: '09/20/2020',
      createdBy: 'Cassandra Douglas',
      status: 'Active',
      skills: [
        'Angular',
        'C++',
        'React'
      ],
      description: 'Ea ex non aliquip do do in. Amet non dolor eu deserunt. Cillum consequat qui ipsum pariatur commodo commodo adipisicing aliquip laboris. Non ex minim ipsum consequat adipisicing fugiat consectetur Lorem ea magna et. Ut in qui culpa enim. Cillum eiusmod veniam amet pariatur non nisi sunt officia duis nulla aute sint nostrud. Eu id elit ex in voluptate in adipisicing anim aliquip laborum magna velit ea.\r\n'
    },
    {
      id: 62100,
      title: 'UI/UX Developer',
      team: 'Microsoft',
      position: 5,
      submission: 0,
      manager: 'Chaney Lyons',
      createdAt: '01/05/2020',
      updatedAt: '08/19/2020',
      createdBy: 'Alexandra Meadows',
      status: 'Processing',
      skills: [
        'Azure',
        'JavaScript',
        'Azure'
      ],
      description: 'Lorem aliqua dolore ipsum elit laborum sit laborum cillum irure amet non nostrud. Culpa ut eiusmod sint consectetur ea esse officia enim occaecat. Proident pariatur dolore amet aliqua commodo ut ad nostrud. Culpa culpa amet Lorem ut nisi occaecat magna voluptate labore. Lorem aute sint in amet cillum nulla ipsum mollit cillum est reprehenderit.\r\n'
    },
    {
      id: 63100,
      title: 'Web Developer',
      team: 'Google',
      position: 2,
      submission: 0,
      manager: 'Downs Downs',
      createdAt: '07/14/2020',
      updatedAt: '09/04/2020',
      createdBy: 'Cheryl Dickson',
      status: 'Processing',
      skills: [
        'Angular',
        'C++',
        'Java'
      ],
      description: 'Magna minim dolor ut laboris dolore deserunt ex voluptate esse id ullamco sunt sunt. Qui qui consectetur labore irure qui deserunt esse laborum incididunt aute voluptate minim. Dolore non cillum labore commodo ipsum aliquip magna. Occaecat irure nulla et cillum cillum proident quis enim commodo adipisicing deserunt nostrud. Non enim eu reprehenderit aute in voluptate esse sint reprehenderit deserunt nulla. Proident pariatur laborum ut enim et ea Lorem nostrud quis qui enim. Velit est in commodo amet do.\r\n'
    },
    {
      id: 64100,
      title: 'Angular Developer',
      team: 'Amazone',
      position: 3,
      submission: 0,
      manager: 'Flowers Odom',
      createdAt: '04/20/2020',
      updatedAt: '08/16/2020',
      createdBy: 'Blanchard Rasmussen',
      status: 'Active',
      skills: [
        'AWS',
        'Angular',
        'Angular'
      ],
      description: 'Ullamco culpa nisi sint ipsum exercitation id anim aliquip sint. Qui minim qui fugiat ipsum exercitation reprehenderit voluptate elit. Deserunt irure officia deserunt amet. Cillum ipsum est ut ut. Elit labore veniam sit incididunt. Adipisicing ea nulla ea aliqua ad laboris fugiat exercitation commodo magna deserunt.\r\n'
    },
    {
      id: 65100,
      title: 'Software Developer',
      team: 'Amazone',
      position: 3,
      submission: 0,
      manager: 'Hobbs David',
      createdAt: '01/23/2020',
      updatedAt: '09/18/2020',
      createdBy: 'Lorraine Mccoy',
      status: 'Closed',
      skills: [
        'AWS',
        'Azure',
        'JavaScript'
      ],
      description: 'Velit eu sunt ad deserunt. Pariatur incididunt qui adipisicing consectetur fugiat sunt aliquip exercitation fugiat magna. Culpa exercitation dolore ut do mollit pariatur consectetur ipsum fugiat.\r\n'
    },
    {
      id: 66100,
      title: 'Angular Developer',
      team: 'Amazone',
      position: 3,
      submission: 0,
      manager: 'Mason Heath',
      createdAt: '01/04/2020',
      updatedAt: '09/26/2020',
      createdBy: 'Lilia Rollins',
      status: 'Processing',
      skills: [
        'HTNL',
        'C#',
        'HTNL'
      ],
      description: 'Consectetur nulla voluptate et deserunt enim officia nulla voluptate id labore. Do magna ut ut incididunt quis ex nulla enim laborum nulla fugiat Lorem est. Sit mollit nisi velit proident ea non voluptate aliqua. Deserunt Lorem velit dolor ut enim elit anim in. Ipsum aute fugiat ut cupidatat ex laboris Lorem eu culpa minim aliquip minim. Esse dolor deserunt aliqua esse do magna occaecat nulla consectetur reprehenderit amet laborum non.\r\n'
    },
    {
      id: 67100,
      title: 'Software Developer',
      team: 'Microsoft',
      position: 6,
      submission: 0,
      manager: 'Etta Pena',
      createdAt: '04/18/2020',
      updatedAt: '08/24/2020',
      createdBy: 'Natalie Gentry',
      status: 'Active',
      skills: [
        'HTNL',
        'C#',
        'Java'
      ],
      description: 'Ex adipisicing cillum cupidatat nulla sit elit nostrud cillum occaecat labore. Aute mollit enim duis tempor pariatur aliquip elit ipsum velit eiusmod sint consectetur. Enim fugiat occaecat amet dolore laboris labore enim incididunt. Eu anim est ea excepteur. Irure occaecat pariatur adipisicing qui consectetur. Culpa dolore aute labore anim ipsum magna aliqua tempor ullamco nisi aliquip cupidatat. Occaecat fugiat fugiat excepteur aliqua nostrud aliqua mollit.\r\n'
    },
    {
      id: 68100,
      title: 'UI/UX Developer',
      team: 'Microsoft',
      position: 2,
      submission: 0,
      manager: 'Bartlett Townsend',
      createdAt: '02/14/2020',
      updatedAt: '08/11/2020',
      createdBy: 'Humphrey Michael',
      status: 'Closed',
      skills: [
        'C#',
        'HTNL',
        'Java'
      ],
      description: 'Labore mollit cupidatat dolore nulla aliquip esse et. Amet excepteur occaecat elit nisi incididunt pariatur ut id nisi aliqua. Culpa cillum ex esse occaecat eu.\r\n'
    },
    {
      id: 69100,
      title: 'Angular Developer',
      team: 'MS (Azure)',
      position: 3,
      submission: 0,
      manager: 'Britt Best',
      createdAt: '12/08/2019',
      updatedAt: '09/16/2020',
      createdBy: 'Franklin Vance',
      status: 'Active',
      skills: [
        'Azure',
        'C++',
        'React'
      ],
      description: 'Magna ipsum irure Lorem occaecat laboris. Culpa ea consequat dolore aliqua laboris Lorem proident adipisicing eiusmod culpa. Aute aliquip aliquip irure ut incididunt pariatur qui est pariatur eu elit. Magna ad voluptate dolore sint minim fugiat elit ad quis nulla proident nulla labore. Anim quis adipisicing minim veniam deserunt cillum adipisicing do. Deserunt laborum exercitation proident ad exercitation sint nostrud elit reprehenderit officia in ut aliquip. Aliqua incididunt est laboris enim sint qui nostrud dolor.\r\n'
    },
    {
      id: 70100,
      title: 'BackEnd Developer',
      team: 'Google',
      position: 6,
      submission: 0,
      manager: 'Cristina Bond',
      createdAt: '03/06/2020',
      updatedAt: '08/14/2020',
      createdBy: 'Casandra Cannon',
      status: 'Active',
      skills: [
        'C++',
        'HTNL',
        'HTNL'
      ],
      description: 'Exercitation adipisicing qui fugiat nostrud eiusmod occaecat tempor pariatur nostrud irure labore. Magna ex consectetur in qui proident aliqua sunt esse pariatur. Sit ullamco proident aute culpa. Adipisicing consequat in ex ut ullamco deserunt velit irure sunt aliquip et elit elit.\r\n'
    },
    {
      id: 71100,
      title: 'UI/UX Developer',
      team: 'Microsoft',
      position: 6,
      submission: 0,
      manager: 'Chang Key',
      createdAt: '03/01/2020',
      updatedAt: '08/18/2020',
      createdBy: 'Abbott Dillard',
      status: 'Closed',
      skills: [
        'React',
        'JavaScript',
        'Angular'
      ],
      description: 'Mollit est laboris pariatur sunt duis laboris non eiusmod irure. Aliquip est anim officia culpa proident laborum adipisicing commodo ea reprehenderit. Officia qui nisi sint eu exercitation incididunt veniam.\r\n'
    },
    {
      id: 72100,
      title: 'React Developer',
      team: 'Microsoft',
      position: 6,
      submission: 0,
      manager: 'Cherry Fox',
      createdAt: '07/01/2020',
      updatedAt: '08/23/2020',
      createdBy: 'Singleton Kirby',
      status: 'Closed',
      skills: [
        'JavaScript',
        'Java',
        'React'
      ],
      description: 'Voluptate ut exercitation exercitation fugiat anim nostrud. Nulla proident amet aliqua exercitation laboris eu dolor id Lorem. Deserunt elit laborum amet mollit consectetur. Laborum adipisicing deserunt laboris fugiat magna commodo eu sint Lorem non cillum nostrud. Minim anim cupidatat in ex sunt minim anim amet consequat Lorem culpa.\r\n'
    },
    {
      id: 73100,
      title: 'BackEnd Developer',
      team: 'Microsoft',
      position: 2,
      submission: 0,
      manager: 'Pauline Mcclure',
      createdAt: '01/01/2020',
      updatedAt: '09/18/2020',
      createdBy: 'Warren Blair',
      status: 'Closed',
      skills: [
        'Java',
        'AWS',
        'JavaScript'
      ],
      description: 'Elit dolor eu commodo ex irure pariatur voluptate laborum ea in laboris culpa. Labore ipsum quis occaecat cupidatat. Proident ex sint nisi voluptate. Consectetur elit do Lorem nisi cupidatat et.\r\n'
    },
    {
      id: 74100,
      title: 'UI/UX Developer',
      team: 'MS (Azure)',
      position: 2,
      submission: 0,
      manager: 'Madeleine Wilkerson',
      createdAt: '05/28/2020',
      updatedAt: '09/30/2020',
      createdBy: 'Mcneil Berg',
      status: 'Processing',
      skills: [
        'Java',
        'Angular',
        'AWS'
      ],
      description: 'Laboris occaecat nostrud do voluptate do cupidatat minim sit. Ipsum non eu elit sint est cupidatat ex nisi excepteur amet velit nostrud cupidatat. Labore aliqua sunt duis esse id dolore excepteur ipsum quis qui ex dolor consequat. Veniam voluptate magna culpa duis cupidatat irure mollit duis.\r\n'
    },
    {
      id: 75100,
      title: 'Software Developer',
      team: 'Amazone',
      position: 6,
      submission: 0,
      manager: 'Marion Walters',
      createdAt: '01/03/2020',
      updatedAt: '08/24/2020',
      createdBy: 'Selena Williamson',
      status: 'Closed',
      skills: [
        'React',
        'AWS',
        'AWS'
      ],
      description: 'Labore enim amet ipsum cillum sit cillum quis quis. Officia minim sunt elit nulla dolor esse anim et aute nostrud. Elit mollit aute ad labore sunt.\r\n'
    },
    {
      id: 76100,
      title: 'Web Developer',
      team: 'Amazone',
      position: 2,
      submission: 0,
      manager: 'Kristie Bolton',
      createdAt: '03/19/2020',
      updatedAt: '09/12/2020',
      createdBy: 'Francine Humphrey',
      status: 'Processing',
      skills: [
        'AWS',
        'Java',
        'AWS'
      ],
      description: 'Anim sunt culpa culpa consequat ullamco et eiusmod proident. Laboris et proident laborum ex aute reprehenderit qui et nisi consequat dolore dolore culpa qui. Culpa in commodo laborum est incididunt laborum irure nostrud irure officia dolore minim. Sit amet aliqua labore in elit fugiat et commodo sunt duis voluptate sunt. Aliqua elit nostrud nulla eiusmod labore. Consectetur enim culpa laborum voluptate ullamco. Laborum Lorem sint occaecat eiusmod consectetur officia.\r\n'
    },
    {
      id: 77100,
      title: 'Software Developer',
      team: 'Google',
      position: 2,
      submission: 0,
      manager: 'Sweet Griffith',
      createdAt: '02/08/2020',
      updatedAt: '09/17/2020',
      createdBy: 'Dollie Huffman',
      status: 'Active',
      skills: [
        'Angular',
        'C#',
        'C++'
      ],
      description: 'Et ad laborum minim laboris amet irure sint ea aute consectetur culpa aliqua culpa dolore. Elit est aliquip mollit magna esse proident proident anim consectetur anim. Tempor ea exercitation proident veniam adipisicing duis ea duis enim elit qui. Amet ut nisi minim ea. Ad in ipsum veniam dolor. Deserunt do mollit occaecat nisi quis sunt eu in.\r\n'
    },
    {
      id: 78100,
      title: 'UI/UX Developer',
      team: 'Amazone',
      position: 5,
      submission: 0,
      manager: 'Joni Avila',
      createdAt: '04/30/2020',
      updatedAt: '09/17/2020',
      createdBy: 'Della Christensen',
      status: 'Closed',
      skills: [
        'React',
        'Azure',
        'Azure'
      ],
      description: 'Commodo in ea do elit aliqua et aliqua. Reprehenderit commodo reprehenderit ex ullamco non incididunt cupidatat reprehenderit laborum ad pariatur in consectetur amet. Elit sunt anim ex dolor sit qui adipisicing proident.\r\n'
    },
    {
      id: 79100,
      title: 'UI/UX Developer',
      team: 'Google',
      position: 5,
      submission: 0,
      manager: 'Glenna Rodriguez',
      createdAt: '04/09/2020',
      updatedAt: '09/02/2020',
      createdBy: 'Desiree Wolfe',
      status: 'Active',
      skills: [
        'React',
        'React',
        'JavaScript'
      ],
      description: 'Veniam tempor eiusmod aliquip aute. Ut id incididunt dolor adipisicing proident. Mollit consequat occaecat quis esse. Lorem fugiat dolore dolor sit quis aliqua eiusmod proident. Aliquip officia pariatur nostrud incididunt. Adipisicing non consectetur cillum pariatur reprehenderit eu. Laborum aute proident sit est laboris excepteur ut ad velit.\r\n'
    },
    {
      id: 80100,
      title: 'UI/UX Developer',
      team: 'Microsoft',
      position: 6,
      submission: 0,
      manager: 'Hogan Lancaster',
      createdAt: '05/07/2020',
      updatedAt: '08/16/2020',
      createdBy: 'Bean Jenkins',
      status: 'Processing',
      skills: [
        'AWS',
        'Java',
        'AWS'
      ],
      description: 'Adipisicing ea dolore enim veniam commodo ad amet culpa aliquip sit dolore commodo occaecat minim. Tempor fugiat velit amet mollit. Est pariatur ipsum duis ut. Consequat labore mollit commodo aute eiusmod culpa voluptate.\r\n'
    },
    {
      id: 81100,
      title: 'BackEnd Developer',
      team: 'Google',
      position: 6,
      submission: 0,
      manager: 'Calhoun Frost',
      createdAt: '02/16/2020',
      updatedAt: '09/19/2020',
      createdBy: 'Ellen Glenn',
      status: 'Active',
      skills: [
        'C++',
        'C++',
        'AWS'
      ],
      description: 'Do amet duis elit laboris adipisicing dolor labore eu velit consequat Lorem. Est aute enim et magna magna voluptate dolore aliqua consequat minim. Id commodo culpa ullamco elit et.\r\n'
    },
    {
      id: 82100,
      title: 'Software Developer',
      team: 'Amazone',
      position: 3,
      submission: 0,
      manager: 'Foley Beasley',
      createdAt: '01/24/2020',
      updatedAt: '09/03/2020',
      createdBy: 'Michele Estes',
      status: 'Processing',
      skills: [
        'C#',
        'React',
        'Java'
      ],
      description: 'Anim deserunt ut laboris reprehenderit dolore Lorem ut. Dolor officia do culpa ullamco eu sint sunt. Do officia esse minim dolor reprehenderit veniam duis sit. Amet eiusmod consequat aute cillum do esse aute qui aliqua aliquip mollit. Minim consequat Lorem cillum pariatur ut est deserunt mollit pariatur culpa esse exercitation. Consequat consectetur dolor voluptate pariatur est occaecat sunt eu Lorem dolore ad aliqua.\r\n'
    },
    {
      id: 83100,
      title: 'Angular Developer',
      team: 'Google',
      position: 6,
      submission: 0,
      manager: 'Wendy Ramsey',
      createdAt: '07/19/2020',
      updatedAt: '08/01/2020',
      createdBy: 'Noble Carney',
      status: 'Processing',
      skills: [
        'Azure',
        'React',
        'AWS'
      ],
      description: 'Aliquip sit irure consectetur reprehenderit est anim eiusmod cupidatat dolore proident laboris fugiat voluptate occaecat. Ex ex velit elit irure fugiat voluptate exercitation non ex cillum sit labore. Reprehenderit in proident nisi cupidatat reprehenderit labore amet cupidatat. Aliquip adipisicing ad veniam consequat ad proident magna nostrud aliquip id esse adipisicing amet. Et ut ullamco ad veniam nulla. Sit excepteur duis sunt cupidatat et aliqua.\r\n'
    },
    {
      id: 84100,
      title: 'UI/UX Developer',
      team: 'Amazone',
      position: 6,
      submission: 0,
      manager: 'Melton Landry',
      createdAt: '12/13/2019',
      updatedAt: '08/11/2020',
      createdBy: 'Moon Davidson',
      status: 'Processing',
      skills: [
        'HTNL',
        'HTNL',
        'C#'
      ],
      description: 'Quis dolore cillum qui laborum sit sunt et excepteur est dolor cillum dolor dolore. Elit reprehenderit nostrud do laborum nostrud eiusmod nisi incididunt laboris incididunt reprehenderit consequat aliqua quis. Irure magna culpa laboris dolor sit ipsum consectetur irure aliquip ad cupidatat amet occaecat mollit. Tempor ex ea aute ex mollit proident exercitation incididunt officia. Anim tempor aute excepteur nostrud do anim.\r\n'
    },
    {
      id: 85100,
      title: 'Angular Developer',
      team: 'Amazone',
      position: 6,
      submission: 0,
      manager: 'Tameka Shaw',
      createdAt: '12/10/2019',
      updatedAt: '08/27/2020',
      createdBy: 'Marcia Steele',
      status: 'Active',
      skills: [
        'AWS',
        'AWS',
        'Angular'
      ],
      description: 'Incididunt sit aliquip voluptate irure laborum aliquip ipsum eiusmod quis. Consectetur excepteur sunt incididunt nulla sint nostrud. Deserunt ex pariatur ipsum aute id aute ipsum aliqua ea esse.\r\n'
    },
    {
      id: 86100,
      title: 'BackEnd Developer',
      team: 'MS (Azure)',
      position: 5,
      submission: 0,
      manager: 'Glenda Franklin',
      createdAt: '12/05/2019',
      updatedAt: '09/08/2020',
      createdBy: 'Nichols Ellison',
      status: 'Closed',
      skills: [
        'JavaScript',
        'React',
        'Angular'
      ],
      description: 'Aliqua sint ullamco reprehenderit labore sint nisi deserunt in laboris adipisicing veniam occaecat. Ut et in cillum aliquip sunt reprehenderit enim. Nisi esse nisi dolor cillum.\r\n'
    },
    {
      id: 87100,
      title: 'Web Developer',
      team: 'MS (Azure)',
      position: 6,
      submission: 0,
      manager: 'Lora Coleman',
      createdAt: '06/18/2020',
      updatedAt: '09/15/2020',
      createdBy: 'Cline Young',
      status: 'Processing',
      skills: [
        'C++',
        'Azure',
        'C#'
      ],
      description: 'Labore aliqua dolore quis mollit. Nulla sit incididunt do laborum labore nostrud reprehenderit. Nisi proident exercitation et tempor reprehenderit cupidatat ipsum consectetur excepteur elit velit culpa anim eiusmod. Magna deserunt excepteur elit ea nisi et ut voluptate voluptate cupidatat quis nulla ea consectetur. Anim laborum nostrud commodo laborum do eiusmod laboris proident.\r\n'
    },
    {
      id: 88100,
      title: 'Angular Developer',
      team: 'Amazone',
      position: 6,
      submission: 0,
      manager: 'Margaret Barrett',
      createdAt: '12/29/2019',
      updatedAt: '09/24/2020',
      createdBy: 'Fannie Molina',
      status: 'Active',
      skills: [
        'JavaScript',
        'Azure',
        'JavaScript'
      ],
      description: 'Aliqua adipisicing voluptate nisi elit labore nulla est elit fugiat exercitation. Deserunt nisi nisi id sunt qui duis sunt do velit labore pariatur nostrud consectetur. Nostrud officia incididunt mollit dolore amet esse laboris velit sit id.\r\n'
    },
    {
      id: 89100,
      title: 'Web Developer',
      team: 'Google',
      position: 5,
      submission: 0,
      manager: 'Pennington Logan',
      createdAt: '05/09/2020',
      updatedAt: '09/27/2020',
      createdBy: 'Regina Parsons',
      status: 'Closed',
      skills: [
        'C++',
        'Java',
        'C++'
      ],
      description: 'Ea nostrud proident tempor sunt. Nulla fugiat culpa est tempor dolore ad adipisicing occaecat. Culpa eiusmod excepteur ullamco culpa minim non ex quis adipisicing do laborum. Exercitation deserunt minim quis dolore labore anim est cillum ex ea non qui tempor. Irure voluptate veniam reprehenderit ut tempor. Id consectetur ad aute Lorem sunt.\r\n'
    },
    {
      id: 90100,
      title: 'Angular Developer',
      team: 'Amazone',
      position: 5,
      submission: 0,
      manager: 'Lori Huber',
      createdAt: '05/30/2020',
      updatedAt: '08/03/2020',
      createdBy: 'Valenzuela Oliver',
      status: 'Processing',
      skills: [
        'HTNL',
        'Angular',
        'Azure'
      ],
      description: 'Quis officia et enim eu officia. Ea tempor excepteur esse in amet consectetur. Nulla velit veniam sunt sint. Deserunt non deserunt mollit anim ut. Cillum ut mollit do incididunt laborum aliquip labore velit magna incididunt dolor labore occaecat nisi. Aute eiusmod duis labore officia aute duis dolore labore consectetur aute veniam magna. Excepteur ut veniam exercitation laborum incididunt Lorem elit velit.\r\n'
    },
    {
      id: 91100,
      title: 'React Developer',
      team: 'Amazone',
      position: 3,
      submission: 0,
      manager: 'Cassie Ross',
      createdAt: '04/06/2020',
      updatedAt: '09/03/2020',
      createdBy: 'Wynn Baldwin',
      status: 'Active',
      skills: [
        'Azure',
        'Java',
        'JavaScript'
      ],
      description: 'Incididunt incididunt consequat exercitation fugiat amet fugiat officia eiusmod. Irure adipisicing enim eiusmod irure. Consectetur velit veniam sint ullamco eiusmod aliquip. Officia officia deserunt proident ut anim nisi. Nulla aute laborum enim sunt velit sint.\r\n'
    },
    {
      id: 92100,
      title: 'Web Developer',
      team: 'MS (Azure)',
      position: 3,
      submission: 0,
      manager: 'Shelton Sullivan',
      createdAt: '05/08/2020',
      updatedAt: '08/13/2020',
      createdBy: 'Rollins Carr',
      status: 'Processing',
      skills: [
        'AWS',
        'React',
        'C#'
      ],
      description: 'Aliquip nostrud aute in incididunt. Magna esse consequat nulla et do aliqua Lorem officia ea incididunt. Eiusmod qui consectetur labore mollit Lorem nostrud laborum enim velit anim est excepteur nostrud consequat. Occaecat tempor tempor dolore do culpa dolore sint ullamco velit est est eu incididunt.\r\n'
    },
    {
      id: 93100,
      title: 'BackEnd Developer',
      team: 'MS (Azure)',
      position: 2,
      submission: 0,
      manager: 'Mathews Goff',
      createdAt: '07/12/2020',
      updatedAt: '09/05/2020',
      createdBy: 'Marjorie Hensley',
      status: 'Processing',
      skills: [
        'Azure',
        'Java',
        'AWS'
      ],
      description: 'Sunt ex esse elit ullamco laboris cillum dolore laboris sit consequat occaecat. Ullamco reprehenderit consequat amet officia in occaecat sunt in labore reprehenderit ad duis ea do. Minim deserunt consequat est irure quis Lorem magna nostrud ad tempor consequat laborum ipsum enim. Labore aliquip adipisicing consequat officia commodo et exercitation minim cillum nostrud pariatur ex nisi.\r\n'
    },
    {
      id: 94100,
      title: 'Software Developer',
      team: 'Amazone',
      position: 6,
      submission: 0,
      manager: 'Tanisha Cox',
      createdAt: '07/28/2020',
      updatedAt: '09/25/2020',
      createdBy: 'Terry Christian',
      status: 'Processing',
      skills: [
        'Angular',
        'JavaScript',
        'Angular'
      ],
      description: 'Velit labore anim labore cillum consectetur sint. Ea nostrud enim cillum aute laborum nostrud. Laboris duis duis veniam do aliquip sint nisi Lorem. Dolor quis aute amet dolore ullamco. Veniam nostrud incididunt fugiat cupidatat minim. Reprehenderit fugiat veniam nostrud velit anim anim sunt non aliquip.\r\n'
    },
    {
      id: 95100,
      title: 'Angular Developer',
      team: 'Amazone',
      position: 6,
      submission: 0,
      manager: 'Langley Frank',
      createdAt: '12/07/2019',
      updatedAt: '09/20/2020',
      createdBy: 'Opal Flynn',
      status: 'Active',
      skills: [
        'JavaScript',
        'React',
        'C#'
      ],
      description: 'Et est cillum amet ex reprehenderit laboris ex ullamco. Eiusmod aute fugiat incididunt culpa ipsum reprehenderit qui sunt aliquip proident sunt nisi officia duis. Ad esse do ad incididunt tempor nostrud Lorem consequat velit dolore est. Aute nisi id magna pariatur.\r\n'
    },
    {
      id: 96100,
      title: 'Software Developer',
      team: 'Microsoft',
      position: 3,
      submission: 0,
      manager: 'Diane Clarke',
      createdAt: '04/03/2020',
      updatedAt: '08/10/2020',
      createdBy: 'Mclean Oneal',
      status: 'Processing',
      skills: [
        'AWS',
        'Azure',
        'Angular'
      ],
      description: 'Magna quis qui minim non. Sit do laboris excepteur aliquip enim voluptate amet. Duis ullamco et ea culpa ut aute non veniam et cillum commodo minim.\r\n'
    },
    {
      id: 97100,
      title: 'BackEnd Developer',
      team: 'Google',
      position: 6,
      submission: 0,
      manager: 'Stella Rhodes',
      createdAt: '03/06/2020',
      updatedAt: '08/09/2020',
      createdBy: 'Howe Lee',
      status: 'Processing',
      skills: [
        'C#',
        'Java',
        'C#'
      ],
      description: 'Nulla laborum ullamco veniam amet excepteur pariatur irure laborum ea irure quis et. Non nulla cillum anim commodo. Cillum enim cupidatat velit ex. Velit adipisicing cillum labore sunt labore nisi magna amet.\r\n'
    },
    {
      id: 98100,
      title: 'UI/UX Developer',
      team: 'Google',
      position: 5,
      submission: 0,
      manager: 'Hilda Dominguez',
      createdAt: '01/31/2020',
      updatedAt: '09/18/2020',
      createdBy: 'Bernard Bush',
      status: 'Closed',
      skills: [
        'C#',
        'AWS',
        'Angular'
      ],
      description: 'Voluptate reprehenderit ut ipsum enim elit aliquip aliquip tempor qui esse voluptate aliquip et. Cillum aute consequat velit officia laboris aliquip excepteur excepteur laborum elit officia. Consectetur voluptate exercitation irure duis aute commodo enim dolor aute reprehenderit aliqua adipisicing. Culpa aliquip mollit pariatur nulla dolore consequat sit. Minim dolore irure incididunt ex voluptate ullamco non id ad sunt. Eu aliqua ex officia proident aliqua. Minim Lorem fugiat duis aute laborum dolor eu.\r\n'
    },
    {
      id: 99100,
      title: 'UI/UX Developer',
      team: 'MS (Azure)',
      position: 2,
      submission: 0,
      manager: 'Wilkinson Gordon',
      createdAt: '05/10/2020',
      updatedAt: '09/11/2020',
      createdBy: 'Nadia Mclaughlin',
      status: 'Active',
      skills: [
        'JavaScript',
        'React',
        'Angular'
      ],
      description: 'Cupidatat non aute labore fugiat ad aliqua dolor ut dolore dolor ut exercitation ad. Est ullamco laboris voluptate irure. Consectetur sint pariatur ad et aliquip ipsum quis fugiat ad velit elit.\r\n'
    },
      {
        id: 100000,
        title: 'Web Developer',
        team: 'Google',
        position: 5,
        submission: 0,
        manager: 'Horn Hunt',
        createdAt: '04/27/2020',
        updatedAt: '09/10/2020',
        createdBy: 'Odonnell Cohen',
        status: 'Processing',
        skills: [
          'HTNL',
          'Azure',
          'HTNL',
          'Java'
        ],
        description: 'Mollit nulla cupidatat cupidatat id et minim dolore proident elit pariatur sint pariatur. Excepteur qui commodo deserunt consectetur Lorem tempor do cupidatat voluptate proident qui sunt. Sunt aute Lorem nulla sit dolore nostrud ipsum consequat id sunt ut culpa.\r\n'
      },
      {
        id: 1100000,
        title: 'BackEnd Developer',
        team: 'Microsoft',
        position: 6,
        submission: 0,
        manager: 'Larson Calhoun',
        createdAt: '01/12/2020',
        updatedAt: '08/16/2020',
        createdBy: 'Della Hernandez',
        status: 'Active',
        skills: [
          'JavaScript',
          'Angular',
          'HTNL',
          'C++'
        ],
        description: 'Labore sit elit non velit eu ullamco. Et sint minim amet ad ea veniam Lorem laborum ipsum esse anim consequat velit. Ea dolore laboris amet tempor voluptate irure aute ad duis labore. Nisi dolor est ut velit eu deserunt amet ex dolore deserunt nostrud culpa voluptate magna. Culpa laborum labore incididunt Lorem eiusmod labore sint tempor.\r\n'
      },
      {
        id: 2100000,
        title: 'BackEnd Developer',
        team: 'MS (Azure)',
        position: 6,
        submission: 0,
        manager: 'Jessie Mccall',
        createdAt: '06/02/2020',
        updatedAt: '09/06/2020',
        createdBy: 'Helga Mcintyre',
        status: 'Active',
        skills: [
          'HTNL',
          'Java',
          'Angular',
          'AWS'
        ],
        description: 'Mollit nisi ex non nisi aute ipsum irure qui. In minim et laboris qui velit eiusmod excepteur anim sit fugiat eiusmod et. Magna ad amet aliqua ea aliqua incididunt qui cupidatat est enim. Enim consectetur commodo dolore aliqua fugiat in quis in laborum reprehenderit proident fugiat reprehenderit incididunt. Minim deserunt magna excepteur eu excepteur aliquip. Laboris id dolor id laboris qui eu minim deserunt voluptate proident in minim culpa.\r\n'
      },
      {
        id: 3100000,
        title: 'UI/UX Developer',
        team: 'Microsoft',
        position: 6,
        submission: 0,
        manager: 'Ellison Randall',
        createdAt: '12/19/2019',
        updatedAt: '08/15/2020',
        createdBy: 'Edwards Hardy',
        status: 'Active',
        skills: [
          'JavaScript',
          'JavaScript',
          'AWS',
          'Angular'
        ],
        description: 'Amet nostrud consectetur aliqua proident id nulla laboris laboris est ex tempor. Cupidatat irure id deserunt ea nisi eu in irure. Incididunt fugiat deserunt labore deserunt.\r\n'
      },
      {
        id: 4100000,
        title: 'UI/UX Developer',
        team: 'Microsoft',
        position: 6,
        submission: 0,
        manager: 'Coleman Osborne',
        createdAt: '01/16/2020',
        updatedAt: '09/04/2020',
        createdBy: 'Briana Henry',
        status: 'Active',
        skills: [
          'Java',
          'Angular',
          'Java',
          'React'
        ],
        description: 'Consectetur amet sint minim minim nisi in excepteur eiusmod eiusmod. Adipisicing quis cupidatat id aliquip ut duis ut est consectetur id. Minim ipsum irure irure mollit et dolor id elit. Incididunt nostrud duis eiusmod aute culpa enim id do. Consectetur laboris ullamco anim ut dolor laboris ea mollit ut et.\r\n'
      },
      {
        id: 5100000,
        title: 'Angular Developer',
        team: 'MS (Azure)',
        position: 6,
        submission: 0,
        manager: 'Candice Gibbs',
        createdAt: '04/06/2020',
        updatedAt: '08/12/2020',
        createdBy: 'Francine Oneal',
        status: 'Closed',
        skills: [
          'AWS',
          'C++',
          'C#',
          'JavaScript'
        ],
        description: 'Cillum deserunt voluptate ullamco duis tempor mollit quis mollit cupidatat do dolor cillum. Amet veniam proident consectetur et ut voluptate ea voluptate. Mollit nostrud velit do incididunt irure est aliqua quis laborum ipsum do.\r\n'
      },
      {
        id: 6100000,
        title: 'Software Developer',
        team: 'MS (Azure)',
        position: 3,
        submission: 0,
        manager: 'Laura Reyes',
        createdAt: '04/13/2020',
        updatedAt: '09/08/2020',
        createdBy: 'Albert Espinoza',
        status: 'Processing',
        skills: [
          'C#',
          'React',
          'HTNL',
          'React'
        ],
        description: 'Nisi exercitation eiusmod dolor commodo commodo amet. Esse non sunt et laborum laboris esse officia sit. Nisi ad irure exercitation ad velit enim id cupidatat sit. Ut quis Lorem voluptate voluptate. Ut anim irure adipisicing occaecat eu aliqua aliquip irure proident. Officia sint est magna dolor excepteur minim sit mollit eu id incididunt. Ea officia do velit mollit adipisicing enim officia aliquip do anim occaecat Lorem.\r\n'
      },
      {
        id: 7100000,
        title: 'UI/UX Developer',
        team: 'Amazone',
        position: 2,
        submission: 0,
        manager: 'Valdez Villarreal',
        createdAt: '12/09/2019',
        updatedAt: '08/11/2020',
        createdBy: 'Kramer Wagner',
        status: 'Closed',
        skills: [
          'Azure',
          'HTNL',
          'Java',
          'AWS'
        ],
        description: 'Minim esse fugiat veniam enim eiusmod occaecat ea sit sunt minim sunt culpa incididunt ea. Proident ullamco do mollit sunt occaecat ipsum adipisicing excepteur ipsum nulla quis incididunt dolor. Aliquip officia veniam veniam non esse fugiat tempor amet ea. Ea consequat ad esse consectetur veniam esse. Tempor tempor esse in amet dolor ullamco officia laborum commodo culpa voluptate ipsum.\r\n'
      },
      {
        id: 8100000,
        title: 'UI/UX Developer',
        team: 'Microsoft',
        position: 5,
        submission: 0,
        manager: 'Kerry Wilkins',
        createdAt: '02/04/2020',
        updatedAt: '09/26/2020',
        createdBy: 'Cecelia Heath',
        status: 'Active',
        skills: [
          'AWS',
          'React',
          'React',
          'HTNL'
        ],
        description: 'Magna ea labore nisi exercitation quis eiusmod amet. Nulla exercitation adipisicing exercitation elit est commodo adipisicing ex id irure ut labore. Magna ex ut mollit et qui proident nostrud.\r\n'
      },
      {
        id: 9100000,
        title: 'React Developer',
        team: 'MS (Azure)',
        position: 6,
        submission: 0,
        manager: 'Autumn Bartlett',
        createdAt: '06/26/2020',
        updatedAt: '09/14/2020',
        createdBy: 'Stark Nichols',
        status: 'Processing',
        skills: [
          'JavaScript',
          'C++',
          'Angular',
          'Azure'
        ],
        description: 'Mollit ut commodo dolore sint. Lorem eu eiusmod veniam eiusmod. Irure do do commodo commodo et laboris proident ullamco id nisi eiusmod qui. Elit amet esse sunt pariatur.\r\n'
      },
      {
        id: 10100000,
        title: 'Angular Developer',
        team: 'Microsoft',
        position: 2,
        submission: 0,
        manager: 'Jane Bridges',
        createdAt: '03/25/2020',
        updatedAt: '09/15/2020',
        createdBy: 'Cheryl Palmer',
        status: 'Closed',
        skills: [
          'React',
          'Java',
          'C#',
          'C++'
        ],
        description: 'Aliqua do deserunt aliqua veniam do et ullamco enim eu eu in. Esse ex adipisicing elit velit irure qui. In officia magna mollit nostrud dolore eu ipsum Lorem aute proident consequat do. Laboris sit exercitation incididunt mollit cupidatat. Enim anim Lorem laboris amet ex ipsum dolor Lorem exercitation tempor velit magna veniam magna.\r\n'
      },
      {
        id: 11100000,
        title: 'UI/UX Developer',
        team: 'Google',
        position: 5,
        submission: 0,
        manager: 'Ruby Ochoa',
        createdAt: '05/28/2020',
        updatedAt: '09/28/2020',
        createdBy: 'Mariana Wolfe',
        status: 'Processing',
        skills: [
          'C#',
          'JavaScript',
          'Angular',
          'C++'
        ],
        description: 'Officia non ea aliqua velit in eiusmod excepteur deserunt elit nulla et magna. Dolore elit deserunt dolore tempor non laboris non. Ex incididunt fugiat velit eu esse velit. In non eiusmod adipisicing laborum amet adipisicing nostrud ipsum nostrud occaecat reprehenderit. Commodo anim voluptate cillum dolore deserunt magna elit cillum et pariatur anim dolor magna. Pariatur esse ea fugiat laboris elit mollit ea. Laborum velit ad minim aute.\r\n'
      },
      {
        id: 12100000,
        title: 'Angular Developer',
        team: 'MS (Azure)',
        position: 3,
        submission: 0,
        manager: 'Lula Solomon',
        createdAt: '01/28/2020',
        updatedAt: '08/31/2020',
        createdBy: 'Flores Hampton',
        status: 'Processing',
        skills: [
          'C++',
          'JavaScript',
          'Angular',
          'JavaScript'
        ],
        description: 'Fugiat veniam elit qui nulla voluptate commodo ex minim proident nostrud sit aliqua id consequat. Nisi occaecat aute sint minim quis. Laboris tempor amet est officia. Mollit nulla sint amet veniam culpa reprehenderit. Pariatur sunt velit anim reprehenderit mollit enim sit sunt non. Occaecat labore anim proident qui eu nostrud aute magna elit sunt elit enim deserunt.\r\n'
      },
      {
        id: 13100000,
        title: 'BackEnd Developer',
        team: 'Amazone',
        position: 5,
        submission: 0,
        manager: 'Mcgowan Rowland',
        createdAt: '02/13/2020',
        updatedAt: '09/12/2020',
        createdBy: 'Knox Fisher',
        status: 'Processing',
        skills: [
          'JavaScript',
          'Java',
          'JavaScript',
          'HTNL'
        ],
        description: 'Fugiat dolore amet irure culpa minim ipsum non veniam esse magna. Consequat dolore qui elit eiusmod do exercitation irure quis aliqua nulla fugiat aute do. Deserunt voluptate sint est nostrud ut fugiat nulla laborum nostrud nisi ea amet enim voluptate. Quis exercitation est officia non dolore adipisicing veniam et Lorem adipisicing aliquip. Veniam Lorem minim dolor quis.\r\n'
      },
      {
        id: 14100000,
        title: 'React Developer',
        team: 'Microsoft',
        position: 5,
        submission: 0,
        manager: 'Bender Morrow',
        createdAt: '05/30/2020',
        updatedAt: '08/29/2020',
        createdBy: 'Phillips York',
        status: 'Closed',
        skills: [
          'Azure',
          'JavaScript',
          'C#',
          'Angular'
        ],
        description: 'Consectetur ullamco consectetur commodo incididunt eu ullamco velit pariatur. Id Lorem aute incididunt eiusmod nisi ad sint occaecat ipsum exercitation fugiat. Labore fugiat mollit non aliqua.\r\n'
      },
      {
        id: 15100000,
        title: 'BackEnd Developer',
        team: 'Amazone',
        position: 6,
        submission: 0,
        manager: 'Millicent Cannon',
        createdAt: '12/27/2019',
        updatedAt: '08/21/2020',
        createdBy: 'Wise Peters',
        status: 'Closed',
        skills: [
          'JavaScript',
          'React',
          'AWS',
          'Azure'
        ],
        description: 'Commodo elit quis amet Lorem non esse incididunt aliqua mollit duis laboris veniam dolor consectetur. Fugiat occaecat laborum non sint quis deserunt. Fugiat voluptate Lorem anim elit quis adipisicing reprehenderit nisi duis officia sint occaecat amet.\r\n'
      },
      {
        id: 16100000,
        title: 'Angular Developer',
        team: 'Microsoft',
        position: 6,
        submission: 0,
        manager: 'Shelia Best',
        createdAt: '04/04/2020',
        updatedAt: '08/27/2020',
        createdBy: 'Odessa Perkins',
        status: 'Processing',
        skills: [
          'Azure',
          'AWS',
          'React',
          'React'
        ],
        description: 'Do ea quis ut anim exercitation ipsum. Deserunt pariatur reprehenderit nulla labore aliqua tempor aliqua. Adipisicing sint esse voluptate in eu non occaecat eu fugiat fugiat tempor aute ullamco ullamco.\r\n'
      },
      {
        id: 17100000,
        title: 'Web Developer',
        team: 'Microsoft',
        position: 2,
        submission: 0,
        manager: 'Julie Sims',
        createdAt: '07/08/2020',
        updatedAt: '09/20/2020',
        createdBy: 'Ruiz Ray',
        status: 'Closed',
        skills: [
          'AWS',
          'HTNL',
          'AWS',
          'Azure'
        ],
        description: 'Reprehenderit officia aliqua duis veniam. Pariatur cillum non eu minim mollit incididunt esse laborum fugiat. Enim proident nulla minim laboris ut. Exercitation esse amet occaecat mollit ex est ipsum cillum do nisi est id ipsum minim. Nulla excepteur id cillum non occaecat.\r\n'
      },
      {
        id: 18100000,
        title: 'React Developer',
        team: 'Microsoft',
        position: 5,
        submission: 0,
        manager: 'Walters Soto',
        createdAt: '07/27/2020',
        updatedAt: '09/08/2020',
        createdBy: 'Olga Faulkner',
        status: 'Closed',
        skills: [
          'AWS',
          'Azure',
          'JavaScript',
          'C++'
        ],
        description: 'Consectetur consequat in culpa ad. Consectetur officia Lorem aliqua labore non voluptate commodo fugiat dolor irure irure duis proident. Esse sit cupidatat veniam mollit sint.\r\n'
      },
      {
        id: 19100000,
        title: 'UI/UX Developer',
        team: 'Microsoft',
        position: 3,
        submission: 0,
        manager: 'Fuentes Conrad',
        createdAt: '04/30/2020',
        updatedAt: '09/17/2020',
        createdBy: 'Stanton Schroeder',
        status: 'Processing',
        skills: [
          'HTNL',
          'Java',
          'Angular',
          'C++'
        ],
        description: 'Anim eu elit velit commodo et sit. Ullamco ullamco ut elit ipsum amet adipisicing nulla tempor duis consequat. Quis nulla magna laborum nostrud occaecat eiusmod aliqua aliquip non sint tempor aute consequat.\r\n'
      },
      {
        id: 20100000,
        title: 'Web Developer',
        team: 'Microsoft',
        position: 5,
        submission: 0,
        manager: 'Christi Herring',
        createdAt: '03/25/2020',
        updatedAt: '08/31/2020',
        createdBy: 'Latonya Salazar',
        status: 'Closed',
        skills: [
          'HTNL',
          'C#',
          'HTNL',
          'Angular'
        ],
        description: 'Non ad amet nostrud aliquip excepteur eiusmod. Culpa laboris deserunt ex occaecat ex labore ad labore aliquip nostrud laboris commodo. Nulla aliquip enim sint veniam esse reprehenderit aliqua laboris consectetur occaecat in mollit quis.\r\n'
      },
      {
        id: 21100000,
        title: 'React Developer',
        team: 'MS (Azure)',
        position: 6,
        submission: 0,
        manager: 'Walton Gross',
        createdAt: '04/24/2020',
        updatedAt: '09/06/2020',
        createdBy: 'Meyers Norman',
        status: 'Closed',
        skills: [
          'Azure',
          'JavaScript',
          'HTNL',
          'AWS'
        ],
        description: 'Enim anim aliquip cupidatat aute esse duis. Do consectetur aliqua adipisicing ullamco ullamco sint consequat. Quis voluptate consectetur incididunt Lorem in officia velit fugiat esse. Deserunt velit culpa dolore id Lorem.\r\n'
      },
      {
        id: 22100000,
        title: 'Angular Developer',
        team: 'MS (Azure)',
        position: 3,
        submission: 0,
        manager: 'Graves Austin',
        createdAt: '01/17/2020',
        updatedAt: '09/05/2020',
        createdBy: 'Madge Dodson',
        status: 'Closed',
        skills: [
          'AWS',
          'JavaScript',
          'Angular',
          'C#'
        ],
        description: 'Dolor nisi id occaecat veniam velit excepteur labore eiusmod deserunt ea mollit. Sint incididunt velit do adipisicing et aliquip. Cupidatat aute consectetur quis culpa aute in dolor ex. Reprehenderit do id quis cupidatat quis amet.\r\n'
      },
      {
        id: 23100000,
        title: 'UI/UX Developer',
        team: 'MS (Azure)',
        position: 2,
        submission: 0,
        manager: 'Anderson James',
        createdAt: '03/25/2020',
        updatedAt: '09/27/2020',
        createdBy: 'Crystal Stark',
        status: 'Closed',
        skills: [
          'C#',
          'C#',
          'HTNL',
          'Angular'
        ],
        description: 'Quis proident aliqua qui elit exercitation amet in labore do velit sunt. Ullamco magna ea enim adipisicing reprehenderit nostrud pariatur eiusmod cillum anim laboris aute fugiat occaecat. Ad aute reprehenderit non amet duis officia adipisicing ipsum. Cillum pariatur adipisicing sint in irure fugiat irure magna reprehenderit mollit anim Lorem tempor aute. Aliquip ut do duis ea eu reprehenderit dolor Lorem velit veniam.\r\n'
      },
      {
        id: 24100000,
        title: 'Angular Developer',
        team: 'Amazone',
        position: 6,
        submission: 0,
        manager: 'Rebecca Brady',
        createdAt: '02/24/2020',
        updatedAt: '09/13/2020',
        createdBy: 'Jimenez Gentry',
        status: 'Processing',
        skills: [
          'C++',
          'Java',
          'React',
          'Java'
        ],
        description: 'Excepteur culpa duis voluptate laboris cupidatat non. Sint proident Lorem fugiat eu labore sit. Voluptate tempor magna nulla velit ad sint culpa. Do nostrud eiusmod adipisicing sint quis sit Lorem excepteur adipisicing. Nostrud incididunt nulla ipsum pariatur sit pariatur laborum non sit voluptate qui eiusmod eiusmod in.\r\n'
      },
      {
        id: 25100000,
        title: 'UI/UX Developer',
        team: 'MS (Azure)',
        position: 5,
        submission: 0,
        manager: 'Small Boone',
        createdAt: '07/25/2020',
        updatedAt: '08/13/2020',
        createdBy: 'Beryl Patel',
        status: 'Closed',
        skills: [
          'HTNL',
          'Azure',
          'Azure',
          'JavaScript'
        ],
        description: 'Lorem est sint cillum est sunt. Velit laborum reprehenderit labore dolor elit in cillum. Commodo enim ad aliquip enim laborum veniam. Irure elit fugiat irure do minim deserunt duis Lorem pariatur est irure labore. Dolore officia culpa qui ex cillum ea adipisicing laborum consectetur dolor proident deserunt cupidatat.\r\n'
      },
      {
        id: 26100000,
        title: 'Angular Developer',
        team: 'Microsoft',
        position: 3,
        submission: 0,
        manager: 'Navarro Valenzuela',
        createdAt: '03/08/2020',
        updatedAt: '09/18/2020',
        createdBy: 'Bullock Moreno',
        status: 'Processing',
        skills: [
          'React',
          'AWS',
          'HTNL',
          'AWS'
        ],
        description: 'Cillum enim cupidatat incididunt mollit aliqua consequat laborum exercitation labore veniam ad. Et non quis do culpa minim commodo consectetur ut amet excepteur. Anim ipsum est id exercitation in consectetur sit eu laboris magna in tempor sit in.\r\n'
      },
      {
        id: 27100000,
        title: 'Software Developer',
        team: 'Amazone',
        position: 5,
        submission: 0,
        manager: 'Owen Pate',
        createdAt: '01/23/2020',
        updatedAt: '08/01/2020',
        createdBy: 'Elise Hinton',
        status: 'Processing',
        skills: [
          'Java',
          'Java',
          'AWS',
          'Java'
        ],
        description: 'Nulla ea fugiat eu proident. Est ea culpa do voluptate sit exercitation minim aute ea ad. Aute aliquip velit dolore aute ex enim.\r\n'
      },
      {
        id: 28100000,
        title: 'BackEnd Developer',
        team: 'Microsoft',
        position: 5,
        submission: 0,
        manager: 'Weaver Day',
        createdAt: '05/29/2020',
        updatedAt: '09/23/2020',
        createdBy: 'Ramsey Gilbert',
        status: 'Active',
        skills: [
          'Azure',
          'Azure',
          'C#',
          'C++'
        ],
        description: 'Non dolor enim anim proident magna cillum minim. Labore aliquip enim reprehenderit excepteur aliquip do fugiat voluptate nulla. Tempor occaecat pariatur sit exercitation tempor culpa mollit pariatur incididunt enim pariatur. Labore excepteur culpa nulla duis elit id sunt ea id proident.\r\n'
      },
      {
        id: 29100000,
        title: 'UI/UX Developer',
        team: 'Google',
        position: 3,
        submission: 0,
        manager: 'Tara Trujillo',
        createdAt: '04/14/2020',
        updatedAt: '08/11/2020',
        createdBy: 'Dickson Dorsey',
        status: 'Closed',
        skills: [
          'HTNL',
          'HTNL',
          'React',
          'AWS'
        ],
        description: 'Velit cupidatat mollit officia officia laborum. Sit dolore enim ut ex duis. Enim Lorem cillum aliquip ut dolore voluptate cillum Lorem id.\r\n'
      },
      {
        id: 30100000,
        title: 'UI/UX Developer',
        team: 'Google',
        position: 2,
        submission: 0,
        manager: 'Delaney Garrett',
        createdAt: '06/05/2020',
        updatedAt: '08/10/2020',
        createdBy: 'Carver Reese',
        status: 'Active',
        skills: [
          'C#',
          'AWS',
          'C++',
          'JavaScript'
        ],
        description: 'Laboris fugiat excepteur ipsum et adipisicing mollit amet sit do minim laboris excepteur. Lorem proident nostrud qui pariatur nisi esse deserunt adipisicing. Eu officia commodo officia sunt ullamco non veniam ullamco aute minim. Laborum commodo deserunt velit minim commodo magna laboris reprehenderit dolor anim. Nisi laboris minim id esse et quis Lorem in nisi excepteur ipsum. Exercitation amet do non deserunt ad elit voluptate officia veniam proident. Labore incididunt minim eu officia occaecat aliquip veniam sit et minim tempor cupidatat.\r\n'
      },
      {
        id: 31100000,
        title: 'UI/UX Developer',
        team: 'Amazone',
        position: 6,
        submission: 0,
        manager: 'Cleveland Kirkland',
        createdAt: '12/23/2019',
        updatedAt: '08/18/2020',
        createdBy: 'Nancy Clayton',
        status: 'Closed',
        skills: [
          'C#',
          'Angular',
          'HTNL',
          'C++'
        ],
        description: 'In non non ut adipisicing et nisi ad ea. Excepteur magna amet dolore ipsum nisi deserunt ut eu nisi dolor qui laborum ullamco ea. Aute cillum nulla fugiat est aliqua qui reprehenderit velit do deserunt consequat voluptate Lorem sunt.\r\n'
      },
      {
        id: 32100000,
        title: 'Software Developer',
        team: 'Microsoft',
        position: 3,
        submission: 0,
        manager: 'Leblanc Shepard',
        createdAt: '04/23/2020',
        updatedAt: '08/24/2020',
        createdBy: 'Dorothea Ferrell',
        status: 'Processing',
        skills: [
          'Azure',
          'Java',
          'Java',
          'C++'
        ],
        description: 'Lorem non pariatur duis dolor amet deserunt ullamco et qui duis adipisicing magna adipisicing pariatur. Esse quis aliqua id et do sint ea nulla ad dolore esse Lorem. Officia proident et deserunt tempor elit ut sint nisi. Exercitation aliqua nisi occaecat occaecat aliquip qui velit esse aliquip anim fugiat aliqua laboris in. Lorem ex veniam esse voluptate Lorem labore nostrud nulla.\r\n'
      },
      {
        id: 33100000,
        title: 'Software Developer',
        team: 'Microsoft',
        position: 5,
        submission: 0,
        manager: 'Marci Gould',
        createdAt: '02/19/2020',
        updatedAt: '08/28/2020',
        createdBy: 'Porter Collins',
        status: 'Active',
        skills: [
          'HTNL',
          'JavaScript',
          'C#',
          'Java'
        ],
        description: 'Aute ullamco incididunt dolor irure Lorem ullamco duis ad cupidatat. Magna fugiat exercitation exercitation Lorem. Voluptate duis incididunt sint nulla ullamco sunt. Eu incididunt ex ut labore velit minim eiusmod eiusmod eu labore officia id sunt. Consequat exercitation nisi id dolor tempor. Et sit fugiat pariatur qui amet sint aliquip pariatur velit.\r\n'
      },
      {
        id: 34100000,
        title: 'Software Developer',
        team: 'Microsoft',
        position: 6,
        submission: 0,
        manager: 'Morgan Keller',
        createdAt: '05/27/2020',
        updatedAt: '09/10/2020',
        createdBy: 'Sonja Hardin',
        status: 'Processing',
        skills: [
          'React',
          'React',
          'Azure',
          'React'
        ],
        description: 'Elit velit qui in esse. Commodo magna adipisicing ut laborum ipsum sit commodo et magna irure culpa. Magna commodo duis laborum sint amet. Pariatur fugiat laborum consectetur laboris sunt sit ullamco nostrud eu aliqua. Amet aliquip ipsum quis amet Lorem magna magna veniam laboris mollit amet ea mollit.\r\n'
      },
      {
        id: 35100000,
        title: 'React Developer',
        team: 'Google',
        position: 6,
        submission: 0,
        manager: 'Maldonado Huffman',
        createdAt: '06/10/2020',
        updatedAt: '09/02/2020',
        createdBy: 'Jody Ballard',
        status: 'Processing',
        skills: [
          'Angular',
          'React',
          'HTNL',
          'Angular'
        ],
        description: 'Aliqua exercitation adipisicing consectetur laborum aute. Et tempor ipsum excepteur nulla. Mollit sit incididunt quis amet reprehenderit sunt exercitation.\r\n'
      },
      {
        id: 36100000,
        title: 'UI/UX Developer',
        team: 'Google',
        position: 2,
        submission: 0,
        manager: 'Peggy William',
        createdAt: '01/14/2020',
        updatedAt: '08/06/2020',
        createdBy: 'Riggs Hess',
        status: 'Closed',
        skills: [
          'Angular',
          'C++',
          'C#',
          'C++'
        ],
        description: 'Nulla irure eu officia officia eu ipsum enim. Occaecat et laboris fugiat labore fugiat esse commodo quis occaecat ex. Et aliqua deserunt veniam voluptate officia reprehenderit commodo ut ullamco voluptate aliqua Lorem ad. Nulla id mollit reprehenderit consectetur veniam do ea veniam mollit elit exercitation cupidatat cillum.\r\n'
      },
      {
        id: 37100000,
        title: 'Angular Developer',
        team: 'Google',
        position: 3,
        submission: 0,
        manager: 'Claudine Pierce',
        createdAt: '02/25/2020',
        updatedAt: '09/10/2020',
        createdBy: 'Joseph Leonard',
        status: 'Closed',
        skills: [
          'C++',
          'Angular',
          'JavaScript',
          'Java'
        ],
        description: 'Aliqua tempor id excepteur reprehenderit excepteur cillum do ad adipisicing adipisicing. Fugiat commodo ullamco laboris culpa duis non. Officia ullamco elit nulla ipsum adipisicing sunt ipsum anim nisi proident magna ea irure sunt. Quis aliqua veniam cupidatat minim et ut consectetur quis mollit qui labore aliqua. Commodo cillum et est fugiat do et. Tempor duis ad non in velit qui laboris magna adipisicing. Sit officia exercitation quis labore fugiat pariatur excepteur ipsum.\r\n'
      },
      {
        id: 38100000,
        title: 'UI/UX Developer',
        team: 'Google',
        position: 3,
        submission: 0,
        manager: 'Raquel Dillard',
        createdAt: '01/10/2020',
        updatedAt: '09/07/2020',
        createdBy: 'Noble Luna',
        status: 'Closed',
        skills: [
          'Azure',
          'C++',
          'Azure',
          'C++'
        ],
        description: 'Enim commodo magna ut cillum cillum ipsum id eiusmod. Ipsum minim dolore deserunt anim elit. Est elit nostrud cillum elit exercitation. Tempor cillum mollit officia proident reprehenderit ipsum minim exercitation proident irure nisi eiusmod quis ipsum. Proident anim velit cupidatat voluptate tempor aliqua aliqua laborum nostrud. Qui nostrud veniam reprehenderit occaecat ea ex non ut ad veniam ipsum dolore.\r\n'
      },
      {
        id: 39100000,
        title: 'Angular Developer',
        team: 'Microsoft',
        position: 2,
        submission: 0,
        manager: 'Gray Parrish',
        createdAt: '12/03/2019',
        updatedAt: '08/03/2020',
        createdBy: 'Ramos Glenn',
        status: 'Closed',
        skills: [
          'React',
          'HTNL',
          'Java',
          'Azure'
        ],
        description: 'Irure nostrud cupidatat qui laborum aliqua quis sint exercitation dolore. Do minim amet quis pariatur cillum excepteur duis elit ad et cupidatat ipsum qui. Est occaecat do officia id cillum eu et consequat sit ad veniam fugiat.\r\n'
      },
      {
        id: 40100000,
        title: 'Software Developer',
        team: 'Google',
        position: 5,
        submission: 0,
        manager: 'Adela Carson',
        createdAt: '06/30/2020',
        updatedAt: '08/14/2020',
        createdBy: 'Priscilla Baird',
        status: 'Closed',
        skills: [
          'Java',
          'JavaScript',
          'Java',
          'Java'
        ],
        description: 'Cillum elit anim voluptate dolore aliquip non et cillum culpa. In magna aliquip ut enim id. Fugiat ipsum ullamco aliquip irure laboris sit tempor officia nostrud Lorem. Eu enim exercitation voluptate tempor culpa enim aliquip sint dolore proident do occaecat aute commodo. Eu nostrud eiusmod sunt voluptate qui culpa ad tempor consequat. Adipisicing tempor aliquip tempor excepteur elit in sit minim sint.\r\n'
      },
      {
        id: 41100000,
        title: 'React Developer',
        team: 'Google',
        position: 6,
        submission: 0,
        manager: 'Good Carter',
        createdAt: '07/23/2020',
        updatedAt: '08/18/2020',
        createdBy: 'Hannah Larson',
        status: 'Processing',
        skills: [
          'Azure',
          'HTNL',
          'C#',
          'HTNL'
        ],
        description: 'Labore laboris duis ullamco pariatur ullamco do Lorem esse duis ea voluptate. Sit nisi eu aliquip veniam culpa proident voluptate do occaecat veniam nostrud deserunt dolore. Esse laboris cupidatat sint ex reprehenderit culpa dolor elit dolore. In aliquip aute enim eiusmod tempor duis Lorem. In do eu consequat cillum ipsum minim adipisicing aute in. Consequat exercitation non Lorem sint pariatur aute nisi sunt amet. Cillum nostrud fugiat laboris labore sunt proident reprehenderit ut.\r\n'
      },
      {
        id: 42100000,
        title: 'UI/UX Developer',
        team: 'Google',
        position: 5,
        submission: 0,
        manager: 'Letitia Little',
        createdAt: '04/25/2020',
        updatedAt: '09/16/2020',
        createdBy: 'Nina Phelps',
        status: 'Processing',
        skills: [
          'AWS',
          'C++',
          'HTNL',
          'C++'
        ],
        description: 'Excepteur consequat sunt adipisicing labore ad fugiat laborum laborum tempor. Quis amet labore pariatur laborum pariatur id nostrud do irure elit minim adipisicing enim ipsum. Officia deserunt aute dolore consectetur non dolor in. Dolore sint ipsum culpa fugiat.\r\n'
      },
      {
        id: 43100000,
        title: 'Web Developer',
        team: 'Amazone',
        position: 2,
        submission: 0,
        manager: 'Maggie Vincent',
        createdAt: '05/24/2020',
        updatedAt: '08/30/2020',
        createdBy: 'Kris Pruitt',
        status: 'Closed',
        skills: [
          'React',
          'Angular',
          'AWS',
          'React'
        ],
        description: 'Minim deserunt reprehenderit eiusmod occaecat deserunt laborum cupidatat consectetur sint amet minim. Lorem incididunt enim voluptate duis qui occaecat officia amet. Incididunt minim non officia consectetur labore cillum occaecat pariatur ea qui sint et irure in. Anim quis sit id est qui. Esse consequat veniam sit sint qui dolore enim aliqua est ut. Veniam anim aliquip exercitation ullamco et ea quis anim culpa sint.\r\n'
      },
      {
        id: 44100000,
        title: 'Angular Developer',
        team: 'Microsoft',
        position: 2,
        submission: 0,
        manager: 'Mabel Schultz',
        createdAt: '03/03/2020',
        updatedAt: '09/06/2020',
        createdBy: 'Enid Mclaughlin',
        status: 'Active',
        skills: [
          'Java',
          'React',
          'HTNL',
          'AWS'
        ],
        description: 'Veniam veniam labore adipisicing nulla quis in amet commodo duis sint nisi in labore excepteur. Et id et nisi do sint sit duis occaecat. Deserunt consequat pariatur consequat enim nulla veniam in velit ad quis. Officia sint cupidatat dolore ea nulla. Laboris do id qui est consectetur eu consectetur proident exercitation.\r\n'
      },
      {
        id: 45100000,
        title: 'Web Developer',
        team: 'Microsoft',
        position: 5,
        submission: 0,
        manager: 'Deana Riggs',
        createdAt: '05/08/2020',
        updatedAt: '09/20/2020',
        createdBy: 'Dillon Wilkerson',
        status: 'Active',
        skills: [
          'JavaScript',
          'C#',
          'Java',
          'HTNL'
        ],
        description: 'Velit adipisicing dolore consequat in sunt consectetur excepteur. Ea incididunt ea esse velit fugiat consequat laborum irure mollit est excepteur ut id. Sit ex ex duis sit ipsum. Culpa sint eiusmod est sint ullamco eu exercitation minim deserunt eu dolore voluptate. Reprehenderit non ex cillum sit eu laborum duis et.\r\n'
      },
      {
        id: 46100000,
        title: 'React Developer',
        team: 'Microsoft',
        position: 6,
        submission: 0,
        manager: 'Tyler Walter',
        createdAt: '01/30/2020',
        updatedAt: '09/17/2020',
        createdBy: 'Preston Wells',
        status: 'Processing',
        skills: [
          'AWS',
          'Angular',
          'JavaScript',
          'C++'
        ],
        description: 'Id voluptate elit officia tempor ea ullamco. In ea minim aliqua et do sit nostrud qui sint aliqua dolore consequat cupidatat id. Magna veniam cillum fugiat mollit voluptate quis do esse eiusmod. Veniam cillum voluptate nulla exercitation pariatur incididunt consequat reprehenderit consequat nulla. Culpa cupidatat nisi fugiat eu veniam cupidatat cillum sit labore est dolor incididunt veniam. Eiusmod cupidatat enim Lorem fugiat veniam ex pariatur laborum dolore deserunt excepteur reprehenderit elit laborum.\r\n'
      },
      {
        id: 47100000,
        title: 'Web Developer',
        team: 'Microsoft',
        position: 2,
        submission: 0,
        manager: 'Arnold Frederick',
        createdAt: '02/08/2020',
        updatedAt: '09/06/2020',
        createdBy: 'Boone Mcneil',
        status: 'Active',
        skills: [
          'C#',
          'Java',
          'Azure',
          'React'
        ],
        description: 'Deserunt enim pariatur amet in eu exercitation qui. Sint do cillum in exercitation Lorem. Mollit nostrud eiusmod enim nostrud do et laborum Lorem sunt. Mollit ipsum anim est commodo magna exercitation adipisicing ex anim sint veniam ea nisi. Nisi ad excepteur tempor in do minim minim et incididunt voluptate labore exercitation mollit sit. Ex nisi exercitation dolor laboris sunt incididunt officia incididunt labore amet duis ut dolor ut.\r\n'
      },
      {
        id: 48100000,
        title: 'BackEnd Developer',
        team: 'Amazone',
        position: 6,
        submission: 0,
        manager: 'Marguerite Davis',
        createdAt: '12/29/2019',
        updatedAt: '08/12/2020',
        createdBy: 'Tyson Kinney',
        status: 'Processing',
        skills: [
          'C++',
          'AWS',
          'JavaScript',
          'HTNL'
        ],
        description: 'Fugiat sunt irure anim consectetur Lorem ex cillum eu cillum Lorem sit culpa. Aliquip id adipisicing cillum do dolore aute elit tempor non. Esse elit excepteur mollit magna. Deserunt consequat voluptate est elit incididunt et eiusmod ea nisi aute laboris ea ullamco eiusmod. Aliqua est ut anim id officia id deserunt irure proident. Duis laborum enim ullamco aute laborum sit laborum cupidatat sunt. Sit in dolor eiusmod officia ipsum do nostrud adipisicing ullamco.\r\n'
      },
      {
        id: 49100000,
        title: 'Web Developer',
        team: 'Google',
        position: 5,
        submission: 0,
        manager: 'Leanna Velazquez',
        createdAt: '01/22/2020',
        updatedAt: '09/04/2020',
        createdBy: 'Best Brewer',
        status: 'Closed',
        skills: [
          'Java',
          'AWS',
          'React',
          'AWS'
        ],
        description: 'Consequat quis quis occaecat incididunt eiusmod nulla ad aute. Voluptate non duis quis minim dolor amet anim esse mollit fugiat officia ullamco veniam officia. Sit voluptate aliquip id deserunt dolor qui veniam ex mollit exercitation nulla occaecat. Id veniam laborum ea nostrud amet qui ad nostrud sunt tempor nulla officia aute. Ullamco deserunt esse est ex ipsum voluptate cupidatat ad. Adipisicing mollit cillum est consequat amet deserunt laboris. Eu reprehenderit deserunt deserunt ipsum aliquip aliqua Lorem magna sunt laboris elit Lorem sunt.\r\n'
      },
      {
        id: 50100000,
        title: 'Software Developer',
        team: 'MS (Azure)',
        position: 6,
        submission: 0,
        manager: 'Dean Paul',
        createdAt: '07/23/2020',
        updatedAt: '09/26/2020',
        createdBy: 'Kinney Mcknight',
        status: 'Active',
        skills: [
          'React',
          'Angular',
          'C++',
          'C++'
        ],
        description: 'Id dolor proident est commodo est officia reprehenderit veniam fugiat cillum. Cillum amet adipisicing laboris cupidatat cillum dolore ea eiusmod incididunt. Mollit labore consectetur ea dolore aliqua ad. Reprehenderit laborum officia ipsum ut.\r\n'
      },
      {
        id: 51100000,
        title: 'Angular Developer',
        team: 'Microsoft',
        position: 2,
        submission: 0,
        manager: 'Irene Pacheco',
        createdAt: '04/07/2020',
        updatedAt: '09/04/2020',
        createdBy: 'Lara Calderon',
        status: 'Closed',
        skills: [
          'React',
          'JavaScript',
          'Java',
          'C#'
        ],
        description: 'Ipsum excepteur consequat do irure cillum labore quis eiusmod anim eu. Laborum consequat eiusmod laboris nulla anim anim commodo eu. Est tempor et amet eiusmod. Non exercitation sit voluptate reprehenderit aliquip aliquip id ad eiusmod est non. Veniam eu deserunt veniam do dolor esse.\r\n'
      },
      {
        id: 52100000,
        title: 'React Developer',
        team: 'Amazone',
        position: 6,
        submission: 0,
        manager: 'Curtis George',
        createdAt: '05/05/2020',
        updatedAt: '08/03/2020',
        createdBy: 'Chandler Caldwell',
        status: 'Processing',
        skills: [
          'Azure',
          'Java',
          'Java',
          'React'
        ],
        description: 'Aute voluptate incididunt aliqua veniam. Proident labore do nisi enim velit elit. Et elit est voluptate ut sit voluptate laboris dolor dolore adipisicing sit do. Proident laboris minim reprehenderit dolor dolor velit pariatur. Labore officia labore duis tempor laborum consectetur. Ex nulla ea occaecat consectetur et irure incididunt enim ut.\r\n'
      },
      {
        id: 53100000,
        title: 'Angular Developer',
        team: 'MS (Azure)',
        position: 6,
        submission: 0,
        manager: 'Huffman Franklin',
        createdAt: '05/26/2020',
        updatedAt: '08/17/2020',
        createdBy: 'Vinson Valentine',
        status: 'Processing',
        skills: [
          'C#',
          'Angular',
          'C#',
          'AWS'
        ],
        description: 'In occaecat fugiat in incididunt et sunt. Laborum aliqua quis id dolor nulla irure. Et laboris amet ullamco ut consequat aute qui incididunt incididunt qui ea sit. Elit adipisicing culpa non nisi magna consequat. Consequat tempor voluptate ullamco pariatur fugiat et aute in id.\r\n'
      },
      {
        id: 54100000,
        title: 'UI/UX Developer',
        team: 'Microsoft',
        position: 2,
        submission: 0,
        manager: 'Howe Anthony',
        createdAt: '06/19/2020',
        updatedAt: '09/10/2020',
        createdBy: 'Aurelia Booker',
        status: 'Active',
        skills: [
          'AWS',
          'Azure',
          'Angular',
          'AWS'
        ],
        description: 'Culpa culpa ea commodo ea veniam eu proident cillum deserunt quis commodo. Mollit occaecat consectetur velit id aliqua officia consequat ut laborum consequat est. Velit commodo reprehenderit dolore quis id sunt Lorem tempor esse veniam.\r\n'
      },
      {
        id: 55100000,
        title: 'Angular Developer',
        team: 'Amazone',
        position: 5,
        submission: 0,
        manager: 'Clayton Haynes',
        createdAt: '12/28/2019',
        updatedAt: '09/17/2020',
        createdBy: 'Blackburn Gill',
        status: 'Active',
        skills: [
          'Java',
          'C#',
          'AWS',
          'HTNL'
        ],
        description: 'Eiusmod velit laborum laborum excepteur laborum. Cillum ipsum excepteur magna aute duis velit exercitation quis qui Lorem ut incididunt. Do incididunt in esse eiusmod occaecat ullamco fugiat aliquip officia sit labore labore cupidatat. Laborum culpa minim ipsum dolore elit mollit reprehenderit laborum. Consectetur adipisicing aliquip sint consequat proident est. Eiusmod ipsum officia mollit est. Et ad nisi eiusmod consectetur fugiat ad.\r\n'
      },
      {
        id: 56100000,
        title: 'Software Developer',
        team: 'MS (Azure)',
        position: 3,
        submission: 0,
        manager: 'Fern Velasquez',
        createdAt: '12/27/2019',
        updatedAt: '08/14/2020',
        createdBy: 'Bertha Lane',
        status: 'Closed',
        skills: [
          'HTNL',
          'Java',
          'AWS',
          'C++'
        ],
        description: 'Mollit aliquip exercitation excepteur cillum proident veniam Lorem est mollit amet irure cillum ut amet. Occaecat occaecat Lorem consequat qui mollit duis velit magna Lorem id in. Enim esse esse cillum labore adipisicing id incididunt dolor Lorem proident enim. Quis aliqua commodo in consectetur commodo sint aliqua tempor ex ut nisi consectetur aliquip nostrud. Minim cupidatat Lorem anim aliqua pariatur proident exercitation pariatur minim reprehenderit voluptate consectetur aliqua culpa.\r\n'
      },
      {
        id: 57100000,
        title: 'UI/UX Developer',
        team: 'Amazone',
        position: 2,
        submission: 0,
        manager: 'Gregory Baldwin',
        createdAt: '07/02/2020',
        updatedAt: '09/29/2020',
        createdBy: 'Freda Wynn',
        status: 'Processing',
        skills: [
          'C#',
          'Java',
          'C++',
          'Angular'
        ],
        description: 'Veniam proident aliquip occaecat incididunt velit mollit consequat in eu nisi sit labore. In irure ullamco irure do ad duis duis in amet in nisi laboris nisi. Deserunt voluptate consequat ipsum quis elit nulla aliquip laboris fugiat tempor velit occaecat fugiat sunt. Exercitation non enim nisi dolor duis laboris officia. Consectetur qui pariatur dolor ullamco irure officia deserunt deserunt sint. Eu deserunt duis nostrud consectetur. Nisi voluptate adipisicing magna anim non minim.\r\n'
      },
      {
        id: 58100000,
        title: 'BackEnd Developer',
        team: 'Google',
        position: 6,
        submission: 0,
        manager: 'Knight Herrera',
        createdAt: '03/17/2020',
        updatedAt: '08/14/2020',
        createdBy: 'Herrera Tyson',
        status: 'Closed',
        skills: [
          'Angular',
          'JavaScript',
          'Angular',
          'C++'
        ],
        description: 'Veniam eu cupidatat consectetur qui sunt ut officia. Incididunt et in consequat aliqua veniam adipisicing Lorem labore non ea veniam et ad. Sunt aliqua adipisicing ut consequat veniam quis nostrud ullamco veniam voluptate. Aliquip cillum eiusmod quis fugiat proident cillum eu ipsum mollit dolore. Velit aute id anim consequat adipisicing. Ex magna duis culpa irure amet dolor veniam laborum culpa ea nisi aliqua exercitation exercitation.\r\n'
      },
      {
        id: 59100000,
        title: 'Web Developer',
        team: 'Amazone',
        position: 2,
        submission: 0,
        manager: 'Alvarado Morin',
        createdAt: '02/12/2020',
        updatedAt: '08/17/2020',
        createdBy: 'Katelyn Roberts',
        status: 'Processing',
        skills: [
          'Angular',
          'JavaScript',
          'Java',
          'Angular'
        ],
        description: 'Aliquip veniam cupidatat dolore in veniam enim elit qui laborum do. Eu excepteur do culpa exercitation veniam pariatur labore mollit consequat nisi esse. Reprehenderit nulla officia consectetur veniam commodo mollit ut anim id nulla culpa nulla velit et.\r\n'
      },
      {
        id: 60100000,
        title: 'BackEnd Developer',
        team: 'Amazone',
        position: 3,
        submission: 0,
        manager: 'Antonia Hurst',
        createdAt: '02/10/2020',
        updatedAt: '09/01/2020',
        createdBy: 'Nichols Lancaster',
        status: 'Active',
        skills: [
          'Java',
          'AWS',
          'React',
          'HTNL'
        ],
        description: 'Anim minim reprehenderit qui pariatur in eu excepteur ipsum velit culpa nisi irure aliqua sunt. Nulla voluptate do est id eiusmod aliquip reprehenderit veniam irure ullamco nulla commodo commodo eiusmod. Tempor veniam sunt ea aliquip anim nostrud tempor occaecat amet cillum cillum sint elit. Sunt veniam ea laboris enim sint ad cupidatat. Dolore aliqua deserunt est occaecat fugiat mollit mollit eiusmod est aliqua nostrud. Nostrud velit ullamco proident sint enim incididunt occaecat.\r\n'
      },
      {
        id: 61100000,
        title: 'React Developer',
        team: 'Amazone',
        position: 3,
        submission: 0,
        manager: 'Head Wooten',
        createdAt: '03/19/2020',
        updatedAt: '09/06/2020',
        createdBy: 'Alejandra Mckinney',
        status: 'Active',
        skills: [
          'React',
          'JavaScript',
          'C#',
          'JavaScript'
        ],
        description: 'Amet laboris ad id dolore occaecat commodo minim aute enim nisi eu non. Tempor labore dolor sint irure excepteur minim veniam aliqua amet ut nisi officia mollit elit. Fugiat esse esse ullamco Lorem dolore veniam mollit ad in irure velit esse eu.\r\n'
      },
      {
        id: 62100000,
        title: 'Software Developer',
        team: 'MS (Azure)',
        position: 2,
        submission: 0,
        manager: 'Silva Rasmussen',
        createdAt: '01/26/2020',
        updatedAt: '08/10/2020',
        createdBy: 'Elsie Jennings',
        status: 'Active',
        skills: [
          'C#',
          'React',
          'HTNL',
          'Azure'
        ],
        description: 'Deserunt culpa laborum id nulla labore incididunt ipsum incididunt. Amet fugiat occaecat ipsum dolore aute culpa velit ut elit deserunt. Lorem officia elit ipsum Lorem ad. Ad consequat anim eiusmod deserunt magna esse. Amet aute aute tempor deserunt in tempor quis ex aute laboris non commodo.\r\n'
      },
      {
        id: 63100000,
        title: 'BackEnd Developer',
        team: 'Microsoft',
        position: 5,
        submission: 0,
        manager: 'Fitzpatrick Cross',
        createdAt: '07/12/2020',
        updatedAt: '08/20/2020',
        createdBy: 'Chase Mclean',
        status: 'Processing',
        skills: [
          'C++',
          'C++',
          'C#',
          'C++'
        ],
        description: 'Aute eu ullamco Lorem enim laborum. Ullamco do id id pariatur laborum labore ad nulla non do do sit. Veniam sit dolore quis excepteur deserunt irure non quis. Duis quis mollit ipsum consequat sint id dolore minim duis incididunt culpa proident veniam. Ex aliqua deserunt pariatur aliquip commodo ad irure voluptate in occaecat adipisicing duis non incididunt.\r\n'
      },
      {
        id: 64100000,
        title: 'BackEnd Developer',
        team: 'Amazone',
        position: 2,
        submission: 0,
        manager: 'Tabatha Hendricks',
        createdAt: '07/08/2020',
        updatedAt: '08/31/2020',
        createdBy: 'Armstrong Knight',
        status: 'Processing',
        skills: [
          'AWS',
          'C#',
          'AWS',
          'C++'
        ],
        description: 'Quis elit laborum consequat cupidatat elit sit pariatur enim cillum. Sunt dolore do cupidatat cillum. Dolore reprehenderit deserunt aliquip eiusmod veniam ad do minim incididunt. Proident aliqua labore eu elit. Do reprehenderit ad do ullamco amet excepteur laborum labore quis esse adipisicing elit ullamco ipsum.\r\n'
      },
      {
        id: 65100000,
        title: 'Software Developer',
        team: 'Microsoft',
        position: 3,
        submission: 0,
        manager: 'Bianca Pickett',
        createdAt: '03/15/2020',
        updatedAt: '09/17/2020',
        createdBy: 'Ortiz Drake',
        status: 'Active',
        skills: [
          'HTNL',
          'C#',
          'C++',
          'HTNL'
        ],
        description: 'Cillum ullamco dolor ut velit fugiat non veniam nostrud incididunt id ad. Quis voluptate consectetur eiusmod consequat. Proident ea ad velit aute culpa veniam consequat. Commodo ea elit deserunt et aute. Eu culpa magna culpa consequat nisi enim ut proident adipisicing fugiat quis laboris qui.\r\n'
      },
      {
        id: 66100000,
        title: 'Angular Developer',
        team: 'Microsoft',
        position: 3,
        submission: 0,
        manager: 'Josefina Adams',
        createdAt: '05/05/2020',
        updatedAt: '08/01/2020',
        createdBy: 'Vega Short',
        status: 'Closed',
        skills: [
          'Angular',
          'Azure',
          'AWS',
          'HTNL'
        ],
        description: 'Dolore dolore proident dolor occaecat labore laboris excepteur exercitation aute. Elit dolor excepteur Lorem cillum irure laboris anim eu adipisicing veniam exercitation fugiat. Excepteur sunt quis enim nostrud voluptate laboris magna consequat commodo. Laborum nulla non sint velit. Exercitation aute dolore pariatur aute.\r\n'
      },
      {
        id: 67100000,
        title: 'Angular Developer',
        team: 'Amazone',
        position: 2,
        submission: 0,
        manager: 'Bowen Martinez',
        createdAt: '03/19/2020',
        updatedAt: '09/12/2020',
        createdBy: 'Desiree Carney',
        status: 'Active',
        skills: [
          'C++',
          'Angular',
          'Angular',
          'Java'
        ],
        description: 'Ut ad veniam nulla incididunt in dolor mollit aute exercitation anim Lorem duis elit cupidatat. Anim consectetur elit magna duis cupidatat veniam non voluptate qui. Duis occaecat laboris ad Lorem proident officia exercitation culpa aliquip magna aute aliqua velit commodo. Incididunt Lorem officia magna mollit dolor quis occaecat occaecat mollit. Consectetur culpa labore velit officia velit exercitation reprehenderit sint reprehenderit minim do eu.\r\n'
      },
      {
        id: 68100000,
        title: 'Software Developer',
        team: 'MS (Azure)',
        position: 2,
        submission: 0,
        manager: 'Earnestine Bradley',
        createdAt: '01/03/2020',
        updatedAt: '08/10/2020',
        createdBy: 'Robyn Tate',
        status: 'Active',
        skills: [
          'React',
          'JavaScript',
          'Azure',
          'AWS'
        ],
        description: 'Laborum enim quis cupidatat reprehenderit qui. Excepteur commodo excepteur voluptate ullamco dolore laborum fugiat sit. Est eiusmod velit consequat duis ea ex et voluptate eiusmod dolor. Est cupidatat reprehenderit dolore sit.\r\n'
      },
      {
        id: 69100000,
        title: 'UI/UX Developer',
        team: 'Microsoft',
        position: 3,
        submission: 0,
        manager: 'Denise Hays',
        createdAt: '12/13/2019',
        updatedAt: '08/19/2020',
        createdBy: 'Evans England',
        status: 'Active',
        skills: [
          'HTNL',
          'Azure',
          'Azure',
          'HTNL'
        ],
        description: 'Nulla nulla quis magna qui aliqua. Exercitation ut commodo qui laboris veniam anim proident est. Tempor voluptate proident laboris incididunt qui consequat in pariatur. Reprehenderit dolore veniam adipisicing anim tempor proident pariatur exercitation non ex eu tempor.\r\n'
      },
      {
        id: 70100000,
        title: 'React Developer',
        team: 'MS (Azure)',
        position: 5,
        submission: 0,
        manager: 'Karin Manning',
        createdAt: '07/06/2020',
        updatedAt: '08/25/2020',
        createdBy: 'Maricela Blair',
        status: 'Processing',
        skills: [
          'AWS',
          'React',
          'JavaScript',
          'Angular'
        ],
        description: 'Occaecat magna culpa culpa tempor officia. Mollit quis dolor pariatur sit nostrud id ex culpa commodo esse Lorem reprehenderit. Tempor Lorem labore aliqua esse aute mollit. Nostrud occaecat quis incididunt exercitation ea enim et excepteur. Excepteur quis proident dolore magna officia ad nulla laboris culpa nisi veniam occaecat est voluptate. Sit laboris mollit aliqua aute non.\r\n'
      },
      {
        id: 71100000,
        title: 'React Developer',
        team: 'MS (Azure)',
        position: 2,
        submission: 0,
        manager: 'Dorsey Todd',
        createdAt: '05/07/2020',
        updatedAt: '08/24/2020',
        createdBy: 'Anne Logan',
        status: 'Closed',
        skills: [
          'C++',
          'JavaScript',
          'Angular',
          'Java'
        ],
        description: 'Non sunt incididunt excepteur aliqua id tempor enim proident nulla pariatur. Excepteur eiusmod laborum quis nostrud exercitation sint do laborum veniam cupidatat. Fugiat incididunt officia irure proident. Reprehenderit aute excepteur ut consequat ea ea irure enim duis. Veniam laborum id consequat in eiusmod esse quis mollit quis Lorem. Exercitation adipisicing aute nisi anim nostrud sint. Pariatur qui do aliquip ullamco sint sit velit deserunt.\r\n'
      },
      {
        id: 72100000,
        title: 'BackEnd Developer',
        team: 'Microsoft',
        position: 2,
        submission: 0,
        manager: 'Greene Chaney',
        createdAt: '06/27/2020',
        updatedAt: '08/26/2020',
        createdBy: 'Ava Coleman',
        status: 'Processing',
        skills: [
          'AWS',
          'Java',
          'AWS',
          'React'
        ],
        description: 'Dolore eu reprehenderit amet quis qui esse fugiat dolore ad proident labore mollit excepteur. Incididunt aliquip sint eu voluptate eu incididunt aliqua tempor. Duis enim ut voluptate mollit sunt quis aliquip eu.\r\n'
      },
      {
        id: 73100000,
        title: 'Software Developer',
        team: 'Microsoft',
        position: 5,
        submission: 0,
        manager: 'Myrna Snyder',
        createdAt: '01/15/2020',
        updatedAt: '08/17/2020',
        createdBy: 'Wilma Barnes',
        status: 'Active',
        skills: [
          'C++',
          'C#',
          'React',
          'C++'
        ],
        description: 'Dolore commodo ex ea commodo elit eiusmod duis quis tempor labore culpa et id veniam. Ex consequat minim ea deserunt. In laborum id excepteur ex aliqua nostrud do sit sunt pariatur enim. Commodo quis commodo veniam tempor ea fugiat fugiat ex ad ex nisi. Eiusmod enim ad ex incididunt eu mollit aute culpa irure.\r\n'
      },
      {
        id: 74100000,
        title: 'React Developer',
        team: 'Microsoft',
        position: 6,
        submission: 0,
        manager: 'Mccray Mckenzie',
        createdAt: '12/03/2019',
        updatedAt: '08/31/2020',
        createdBy: 'Flora Casey',
        status: 'Processing',
        skills: [
          'HTNL',
          'Angular',
          'C++',
          'React'
        ],
        description: 'Nulla esse tempor eiusmod exercitation nostrud magna dolor ullamco proident do nisi consequat in. Magna in eu aliqua id nulla aliqua ex cupidatat. Amet anim magna incididunt pariatur exercitation eiusmod minim consectetur exercitation. Sunt incididunt nostrud sint magna. Ut ad anim est voluptate sunt sunt. Sit consequat eiusmod dolor aliqua reprehenderit laboris exercitation enim veniam. Exercitation minim adipisicing do sunt eiusmod eiusmod sint velit.\r\n'
      },
      {
        id: 75100000,
        title: 'Angular Developer',
        team: 'Amazone',
        position: 2,
        submission: 0,
        manager: 'Monica Mcdowell',
        createdAt: '12/05/2019',
        updatedAt: '08/20/2020',
        createdBy: 'Misty Quinn',
        status: 'Active',
        skills: [
          'HTNL',
          'HTNL',
          'Java',
          'Angular'
        ],
        description: 'Eiusmod ipsum sunt ut quis dolor voluptate ut aute proident fugiat. Non aute esse laborum quis minim officia nisi laboris ad reprehenderit consectetur fugiat. Deserunt aliquip laboris est anim cillum cillum. Lorem labore incididunt fugiat dolor incididunt. Tempor elit deserunt cupidatat tempor culpa nisi.\r\n'
      },
      {
        id: 76100000,
        title: 'UI/UX Developer',
        team: 'Microsoft',
        position: 5,
        submission: 0,
        manager: 'Hampton Chan',
        createdAt: '06/24/2020',
        updatedAt: '08/31/2020',
        createdBy: 'Foreman Williams',
        status: 'Closed',
        skills: [
          'C#',
          'HTNL',
          'AWS',
          'Azure'
        ],
        description: 'Ex laborum sunt deserunt ipsum veniam nulla commodo proident adipisicing dolor enim irure do ut. Quis laborum aute Lorem excepteur aute consectetur ut nulla Lorem. Lorem culpa incididunt aute cupidatat velit velit sint nostrud dolor excepteur cupidatat. Veniam duis do aute officia cillum ut excepteur. Occaecat laboris ut qui velit voluptate qui ipsum duis.\r\n'
      },
      {
        id: 77100000,
        title: 'BackEnd Developer',
        team: 'Google',
        position: 6,
        submission: 0,
        manager: 'Tamara Hanson',
        createdAt: '04/08/2020',
        updatedAt: '09/02/2020',
        createdBy: 'Pruitt Shannon',
        status: 'Closed',
        skills: [
          'JavaScript',
          'AWS',
          'JavaScript',
          'JavaScript'
        ],
        description: 'Culpa voluptate ipsum voluptate ex. Consequat officia ullamco exercitation Lorem qui Lorem amet veniam anim labore. Ipsum occaecat excepteur consectetur elit Lorem amet sunt. In est excepteur dolore sit enim aliqua dolore non deserunt. Consectetur et non quis amet commodo sint ex ut eu voluptate aliqua culpa.\r\n'
      },
      {
        id: 78100000,
        title: 'BackEnd Developer',
        team: 'Google',
        position: 5,
        submission: 0,
        manager: 'Charlotte Anderson',
        createdAt: '04/27/2020',
        updatedAt: '08/17/2020',
        createdBy: 'Kristie Bowers',
        status: 'Processing',
        skills: [
          'Azure',
          'Angular',
          'Java',
          'JavaScript'
        ],
        description: 'Ad fugiat esse ut cupidatat amet enim excepteur. Commodo culpa sit excepteur et mollit tempor reprehenderit officia aliqua dolor ut laboris minim adipisicing. Elit ea ullamco ut fugiat aliqua nostrud nostrud. Consectetur sunt nostrud enim quis.\r\n'
      },
      {
        id: 79100000,
        title: 'React Developer',
        team: 'Microsoft',
        position: 2,
        submission: 0,
        manager: 'Mitzi Jefferson',
        createdAt: '04/21/2020',
        updatedAt: '08/15/2020',
        createdBy: 'Helene Rollins',
        status: 'Active',
        skills: [
          'C#',
          'Java',
          'AWS',
          'HTNL'
        ],
        description: 'Ipsum anim do et deserunt qui nostrud ex deserunt fugiat. Cillum minim minim cillum officia nisi non ad. Non laborum duis culpa duis nisi sit sint duis eiusmod voluptate labore consequat adipisicing ex. Deserunt sit ea dolore nostrud enim magna culpa nostrud occaecat est nisi elit sunt ex.\r\n'
      },
      {
        id: 80100000,
        title: 'BackEnd Developer',
        team: 'Microsoft',
        position: 5,
        submission: 0,
        manager: 'Christian Hyde',
        createdAt: '02/15/2020',
        updatedAt: '09/02/2020',
        createdBy: 'Emma Clements',
        status: 'Closed',
        skills: [
          'Angular',
          'HTNL',
          'Java',
          'C++'
        ],
        description: 'Occaecat incididunt dolor ad tempor culpa ut elit consequat Lorem aliquip. Labore aute nulla ea nulla duis deserunt voluptate enim aute anim adipisicing voluptate dolor. Velit minim anim ut et excepteur pariatur ad nisi dolore velit nostrud ad laborum laborum. Labore ad id enim quis duis id aliqua ipsum. Et adipisicing est adipisicing in mollit Lorem sint tempor laboris excepteur reprehenderit sit.\r\n'
      },
      {
        id: 81100000,
        title: 'Software Developer',
        team: 'Microsoft',
        position: 6,
        submission: 0,
        manager: 'Marsha Ayers',
        createdAt: '01/07/2020',
        updatedAt: '09/11/2020',
        createdBy: 'Stephens Barton',
        status: 'Closed',
        skills: [
          'AWS',
          'React',
          'React',
          'Angular'
        ],
        description: 'Tempor excepteur anim voluptate aliquip. Anim aliquip exercitation qui et. Culpa labore consectetur aute labore labore sunt ipsum occaecat veniam reprehenderit non reprehenderit ipsum veniam. Proident aliquip et laboris cupidatat cillum aliquip quis. Sint fugiat nulla fugiat ipsum deserunt mollit nostrud magna consectetur eiusmod. Do et culpa laboris tempor occaecat consequat. Sit cillum nostrud sint aliquip est laborum in occaecat et mollit Lorem nisi occaecat.\r\n'
      },
      {
        id: 82100000,
        title: 'Web Developer',
        team: 'Amazone',
        position: 5,
        submission: 0,
        manager: 'Hollie Nguyen',
        createdAt: '04/04/2020',
        updatedAt: '09/04/2020',
        createdBy: 'Maribel Massey',
        status: 'Processing',
        skills: [
          'JavaScript',
          'React',
          'C#',
          'Angular'
        ],
        description: 'Reprehenderit irure deserunt exercitation amet incididunt tempor consectetur ut ad dolor adipisicing amet mollit id. Fugiat officia voluptate sint ex nulla. Tempor exercitation tempor esse veniam anim sunt do.\r\n'
      },
      {
        id: 83100000,
        title: 'Software Developer',
        team: 'Microsoft',
        position: 6,
        submission: 0,
        manager: 'Krystal Frank',
        createdAt: '05/02/2020',
        updatedAt: '09/29/2020',
        createdBy: 'Baird Atkins',
        status: 'Active',
        skills: [
          'React',
          'AWS',
          'Java',
          'AWS'
        ],
        description: 'Nisi voluptate aliquip elit mollit reprehenderit. Nulla laborum ea mollit ullamco Lorem qui dolor sunt veniam excepteur minim commodo. Fugiat deserunt magna aute dolore magna labore. Reprehenderit sunt reprehenderit aliqua labore officia non et excepteur duis qui eu laboris officia. Eiusmod duis ad laboris sunt tempor labore ad enim.\r\n'
      },
      {
        id: 84100000,
        title: 'Software Developer',
        team: 'Amazone',
        position: 3,
        submission: 0,
        manager: 'Betsy Frost',
        createdAt: '06/26/2020',
        updatedAt: '09/04/2020',
        createdBy: 'Hall Kelly',
        status: 'Processing',
        skills: [
          'Angular',
          'Angular',
          'C++',
          'HTNL'
        ],
        description: 'Magna exercitation ad veniam laboris Lorem. Culpa consectetur ipsum exercitation deserunt non ut reprehenderit. Laborum pariatur consequat dolore laborum do aliqua incididunt do adipisicing et commodo consequat culpa mollit. Incididunt ex deserunt consequat aliquip aute est quis veniam ex sit laborum.\r\n'
      },
      {
        id: 85100000,
        title: 'UI/UX Developer',
        team: 'Amazone',
        position: 2,
        submission: 0,
        manager: 'Rosa Ward',
        createdAt: '01/28/2020',
        updatedAt: '09/06/2020',
        createdBy: 'Wiley Burris',
        status: 'Active',
        skills: [
          'Angular',
          'React',
          'C#',
          'HTNL'
        ],
        description: 'Dolore sit sint fugiat excepteur. Nostrud minim nostrud adipisicing tempor culpa. Incididunt ex proident minim esse quis aliquip elit. Amet est duis qui consequat est.\r\n'
      },
      {
        id: 86100000,
        title: 'React Developer',
        team: 'Microsoft',
        position: 6,
        submission: 0,
        manager: 'Chapman Reed',
        createdAt: '12/16/2019',
        updatedAt: '09/20/2020',
        createdBy: 'Hattie Kemp',
        status: 'Closed',
        skills: [
          'Angular',
          'C#',
          'React',
          'JavaScript'
        ],
        description: 'Ex fugiat enim ipsum commodo anim sint aliquip proident duis quis exercitation aute pariatur commodo. In Lorem aliquip deserunt nulla pariatur fugiat minim consequat tempor. Ut incididunt exercitation tempor exercitation incididunt nulla aliquip incididunt occaecat dolore nulla.\r\n'
      },
      {
        id: 87100000,
        title: 'Angular Developer',
        team: 'MS (Azure)',
        position: 2,
        submission: 0,
        manager: 'Marquita Douglas',
        createdAt: '04/07/2020',
        updatedAt: '09/29/2020',
        createdBy: 'Isabel Hull',
        status: 'Processing',
        skills: [
          'C#',
          'Java',
          'Angular',
          'Azure'
        ],
        description: 'Commodo eu Lorem ea esse commodo tempor Lorem dolore aliquip non voluptate sunt eu officia. Do mollit fugiat sit sint aliqua dolor cupidatat. Labore consectetur ex dolor nostrud fugiat cillum ipsum aliqua laboris nisi. Sit ad do ullamco dolore cillum consequat eu qui elit eu. Incididunt aliqua ex non est. Lorem esse aliqua eiusmod cillum duis exercitation ipsum tempor.\r\n'
      },
      {
        id: 88100000,
        title: 'BackEnd Developer',
        team: 'Amazone',
        position: 5,
        submission: 0,
        manager: 'Pierce Morrison',
        createdAt: '06/03/2020',
        updatedAt: '08/25/2020',
        createdBy: 'Sophia Campbell',
        status: 'Processing',
        skills: [
          'Java',
          'C++',
          'Angular',
          'HTNL'
        ],
        description: 'Laborum occaecat Lorem aute qui deserunt culpa dolore mollit consectetur voluptate magna cillum non. Eiusmod cupidatat duis deserunt ullamco voluptate. Magna in nisi deserunt sint eiusmod culpa pariatur sunt adipisicing veniam amet. Aute aliqua incididunt nulla do in occaecat. Duis cillum ullamco ipsum commodo consequat mollit et laboris. Dolore et ad elit proident amet tempor incididunt consequat nisi anim. Irure velit pariatur excepteur commodo exercitation occaecat veniam magna sit magna.\r\n'
      },
      {
        id: 89100000,
        title: 'BackEnd Developer',
        team: 'Microsoft',
        position: 5,
        submission: 0,
        manager: 'Carey Guerra',
        createdAt: '01/26/2020',
        updatedAt: '09/09/2020',
        createdBy: 'Estrada Cantrell',
        status: 'Processing',
        skills: [
          'React',
          'HTNL',
          'C#',
          'Angular'
        ],
        description: 'Incididunt occaecat ipsum mollit irure nulla aute dolor officia amet pariatur aliquip excepteur. Consectetur magna do tempor labore velit. Proident sit ea eu duis laboris minim aute esse sunt deserunt velit aute. Dolore esse adipisicing occaecat dolore consequat.\r\n'
      },
      {
        id: 90100000,
        title: 'React Developer',
        team: 'Amazone',
        position: 3,
        submission: 0,
        manager: 'Dunn Kirby',
        createdAt: '07/17/2020',
        updatedAt: '09/01/2020',
        createdBy: 'Peck Sharp',
        status: 'Active',
        skills: [
          'HTNL',
          'AWS',
          'HTNL',
          'JavaScript'
        ],
        description: 'Fugiat dolor exercitation est ea quis ea nisi amet mollit sunt. Amet Lorem minim exercitation aliquip ut in adipisicing duis minim consectetur culpa. Consequat ad consequat veniam consequat consectetur in ullamco deserunt excepteur eiusmod cupidatat commodo. Cupidatat veniam dolore irure dolore elit do aute proident eu.\r\n'
      },
      {
        id: 91100000,
        title: 'React Developer',
        team: 'Microsoft',
        position: 2,
        submission: 0,
        manager: 'Herminia Ramsey',
        createdAt: '12/03/2019',
        updatedAt: '08/03/2020',
        createdBy: 'Koch Dotson',
        status: 'Closed',
        skills: [
          'React',
          'Azure',
          'JavaScript',
          'React'
        ],
        description: 'Laboris id consectetur velit deserunt culpa exercitation aliquip reprehenderit esse anim proident deserunt velit deserunt. Non excepteur incididunt amet voluptate consectetur elit ad exercitation mollit in mollit. Magna cillum ullamco commodo dolore aliqua aliquip aute ullamco in nostrud. Nulla consequat officia anim cillum sint. Laborum ipsum anim sunt in anim. Elit deserunt eiusmod fugiat ea aute aliquip.\r\n'
      },
      {
        id: 92100000,
        title: 'Software Developer',
        team: 'Amazone',
        position: 5,
        submission: 0,
        manager: 'Burnett Vega',
        createdAt: '07/11/2020',
        updatedAt: '09/12/2020',
        createdBy: 'Haley Schmidt',
        status: 'Processing',
        skills: [
          'Java',
          'C++',
          'AWS',
          'C++'
        ],
        description: 'Voluptate aute exercitation laboris sunt officia incididunt fugiat laboris non est. Sit Lorem Lorem sit exercitation nostrud nulla adipisicing aliquip aute anim pariatur deserunt in eu. Pariatur sit adipisicing excepteur esse aliquip. Cupidatat ullamco duis in ullamco adipisicing culpa nisi. Dolor et ea irure reprehenderit ipsum enim exercitation occaecat.\r\n'
      },
      {
        id: 93100000,
        title: 'Angular Developer',
        team: 'Microsoft',
        position: 2,
        submission: 0,
        manager: 'Mcdowell Leblanc',
        createdAt: '06/15/2020',
        updatedAt: '08/16/2020',
        createdBy: 'Rojas Alvarado',
        status: 'Processing',
        skills: [
          'Azure',
          'React',
          'AWS',
          'C++'
        ],
        description: 'Exercitation ut tempor pariatur cillum consectetur. Veniam cillum minim cillum proident dolore occaecat consequat ullamco occaecat non occaecat nostrud amet culpa. Consectetur exercitation tempor qui irure. Aute sunt id eu proident amet tempor esse sint nostrud fugiat deserunt sit. Eiusmod ut commodo consequat incididunt reprehenderit.\r\n'
      },
      {
        id: 94100000,
        title: 'Web Developer',
        team: 'MS (Azure)',
        position: 5,
        submission: 0,
        manager: 'Cotton Walls',
        createdAt: '01/14/2020',
        updatedAt: '09/26/2020',
        createdBy: 'Allen Conner',
        status: 'Processing',
        skills: [
          'Java',
          'Azure',
          'React',
          'JavaScript'
        ],
        description: 'Incididunt duis proident Lorem non et laboris duis laborum sit cillum fugiat adipisicing esse pariatur. Officia mollit dolore esse labore nisi ut velit adipisicing. Adipisicing nisi exercitation proident dolor et aliquip id.\r\n'
      },
      {
        id: 95100000,
        title: 'Web Developer',
        team: 'Amazone',
        position: 2,
        submission: 0,
        manager: 'Latoya Gates',
        createdAt: '12/26/2019',
        updatedAt: '09/28/2020',
        createdBy: 'Martin Welch',
        status: 'Processing',
        skills: [
          'Java',
          'HTNL',
          'HTNL',
          'React'
        ],
        description: 'Id ex laborum qui qui. Occaecat magna dolor occaecat qui nisi non est exercitation proident. Sit enim enim nisi pariatur esse ex in commodo fugiat deserunt. Aute pariatur laborum proident magna Lorem in ex dolor exercitation officia laboris laboris. Id Lorem excepteur quis occaecat ad eiusmod.\r\n'
      },
      {
        id: 96100000,
        title: 'Angular Developer',
        team: 'Amazone',
        position: 2,
        submission: 0,
        manager: 'James Roman',
        createdAt: '05/03/2020',
        updatedAt: '09/11/2020',
        createdBy: 'Kate Rose',
        status: 'Active',
        skills: [
          'C#',
          'Angular',
          'C#',
          'Java'
        ],
        description: 'In in cillum sit id excepteur laboris proident. Velit officia veniam consectetur magna eu. Tempor occaecat ea nisi culpa id. Occaecat sit nisi elit aliquip mollit. Esse mollit et cillum nisi culpa culpa consequat. Laborum mollit commodo laboris mollit. Sit duis amet do qui excepteur exercitation officia ut id.\r\n'
      },
      {
        id: 97100000,
        title: 'UI/UX Developer',
        team: 'Amazone',
        position: 3,
        submission: 0,
        manager: 'Mclean Cabrera',
        createdAt: '02/17/2020',
        updatedAt: '09/29/2020',
        createdBy: 'Ashlee Hamilton',
        status: 'Active',
        skills: [
          'Java',
          'C++',
          'HTNL',
          'HTNL'
        ],
        description: 'Duis magna fugiat adipisicing Lorem ut voluptate ea deserunt velit consequat. Ad ipsum aute aute incididunt id exercitation consequat voluptate. Culpa incididunt eu sunt culpa sint esse deserunt esse consectetur eu quis sit. Laborum pariatur ad sint voluptate. Sunt enim laboris incididunt id proident deserunt anim voluptate.\r\n'
      },
      {
        id: 98100000,
        title: 'Angular Developer',
        team: 'Google',
        position: 3,
        submission: 0,
        manager: 'Alta Floyd',
        createdAt: '07/06/2020',
        updatedAt: '09/12/2020',
        createdBy: 'Cantu Randolph',
        status: 'Processing',
        skills: [
          'HTNL',
          'Azure',
          'Java',
          'C#'
        ],
        description: 'Anim nulla exercitation aliquip adipisicing consectetur qui nisi labore voluptate. Consequat id in velit cupidatat amet irure elit dolor esse reprehenderit. Aute enim quis non ipsum ullamco irure ad velit. Id nostrud officia excepteur do non id qui cillum cupidatat aliqua adipisicing cupidatat sit. Pariatur aliqua do tempor irure sit ea sint excepteur qui cillum cillum ex. Voluptate irure voluptate voluptate pariatur id eu cupidatat reprehenderit in.\r\n'
      },
      {
        id: 99100000,
        title: 'Angular Developer',
        team: 'MS (Azure)',
        position: 6,
        submission: 0,
        manager: 'Glenn Bolton',
        createdAt: '02/04/2020',
        updatedAt: '08/12/2020',
        createdBy: 'Milagros Mosley',
        status: 'Closed',
        skills: [
          'Angular',
          'Angular',
          'HTNL',
          'Azure'
        ],
        description: 'Excepteur enim consectetur proident nulla veniam excepteur in eu sit laborum magna. Est mollit commodo proident magna cupidatat consectetur reprehenderit tempor elit culpa voluptate eu fugiat. Est tempor magna in occaecat laborum ex eu cupidatat enim commodo do magna adipisicing. Veniam irure labore minim ullamco proident quis dolor enim.\r\n'
      }
    ];

  constructor(
    private docsService: DocsService,
    private alertify: AlertifyService
  ) {}

  // tslint:disable-next-line: contextual-lifecycle
  ngOnInit() {
    this.docsService.getDocs();
    this.docsSub = this.docsService.getDocsUpdateListener().subscribe((res) => {
      this.candidates1 = res.docs;
      this.candidateChangedListener.next([...this.candidates1]);
      this.updateSubs();
    });
  }

  getAllData() {
    this.docsService.getDocs();
    this.docsSub = this.docsService.getDocsUpdateListener().subscribe((res) => {
      this.candidates1 = res.docs;
      this.candidateChangedListener.next([...this.candidates1]);
      this.updateSubs();
      this.dataChangedListener.next([...this.rowData]);
    });
    this.updateSubs();
  }

  cleanSubs() {
    for (const row of this.rowData) {
      row.submission = 0;
    }
  }

  updateSubs() {
    this.cleanSubs();
    for (const candidate of this.candidates1) {
      for (const job of candidate.jobs) {
        for (const row of this.rowData) {
          if (job === row.id) {
            row.submission++;
            break;
          }
        }
      }
    }
    this.dataChangedListener.next([...this.rowData]);
  }

  addData(row: any) {
    const newd = new Date().toLocaleString();
    // tslint:disable-next-line: max-line-length
    this.rowData.unshift(row);
    this.dataChangedListener.next([...this.rowData]);
    this.alertify.success('Job has been added successfully');
  }

  async deleteData(jobs: any) {
    for (const j of jobs) {
    for (let i = 0; i < this.rowData.length; i++) {
        if (this.rowData[i].id === j.data.id) {
          this.rowData.splice(i, 1);
          break;
        }
      }
    }
    this.getAllData();
    if (jobs.length > 1){
      this.alertify.success('Jobs have been deleted successfully');
    }else{
      this.alertify.success('Job has been deleted successfully');
    }
  }

  getDataChangedListener() {
    this.updateSubs();
    return this.dataChangedListener.asObservable();
  }

  getCandidateChangedListener() {
    return this.candidateChangedListener.asObservable();
  }

  getData() {
    this.updateSubs();
    return this.rowData;
  }

  getCandidates() {
    return this.candidates;
  }

  updateData(id: any, Data: any) {
    for (let i = 0; i < this.rowData.length; i++) {
      if (this.rowData[i].id === id) {
        this.rowData[i] = Data;
        break;
      }
    }
    this.dataChangedListener.next([...this.rowData]);
    this.alertify.success('Job has been updated successfully');
  }

  addSubmissions() {
    this.getAllData();
    this.alertify.success('Submission(s) added successfully');
  }

  ngOnDestroy() {
    this.docsSub.unsubscribe();
  }
}
