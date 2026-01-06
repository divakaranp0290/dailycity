import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class SeoService {

    constructor(
        private title: Title,
        private meta: Meta
    ) { }

    setCanonical(url: string) {
        let link: HTMLLinkElement | null =
            document.querySelector("link[rel='canonical']");

        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            document.head.appendChild(link);
        }

        link.setAttribute('href', url);
    }

    setMeta(city: string) {
        const cityName = city.charAt(0).toUpperCase() + city.slice(1);

        this.title.setTitle(
            `${cityName} Today – Power Cut, Traffic, Petrol Price & Gold Rate`
        );

        this.meta.updateTag({
            name: 'description',
            content:
                `Check ${cityName} today updates including power cut status, traffic condition, ` +
                `petrol and diesel price, gold and silver rates, bank status and good time today.`
        });

        this.meta.updateTag({
            name: 'robots',
            content: 'index, follow'
        });
    }

    injectSchema(schema: any) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
    }

    addWebPageSchema(city: string, updatedAt: string) {
        const cityName = city.charAt(0).toUpperCase() + city.slice(1);

        this.injectSchema({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": `${cityName} Today`,
            "description": `Daily updates for ${cityName}`,
            "url": window.location.href,
            "dateModified": updatedAt
        });
    }

    addBreadcrumbSchema(city: string) {
        const cityName = city.charAt(0).toUpperCase() + city.slice(1);

        this.injectSchema({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": window.location.origin
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": cityName,
                    "item": `${window.location.origin}/${city}`
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Today",
                    "item": window.location.href
                }
            ]
        });
    }

    addFaqSchema(city: string, petrol: number, powerCut: boolean) {
        const cityName = city.charAt(0).toUpperCase() + city.slice(1);

        this.injectSchema({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": `Is there a power cut today in ${cityName}?`,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": powerCut
                            ? `Yes, a power cut is reported today in ${cityName}.`
                            : `No power cut is reported today in ${cityName}.`
                    }
                },
                {
                    "@type": "Question",
                    "name": `What is today’s petrol price in ${cityName}?`,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": `Petrol price in ${cityName} today is ₹${petrol} per litre.`
                    }
                }
            ]
        });
    }
    
}
