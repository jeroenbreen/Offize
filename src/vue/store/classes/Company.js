import _Base from '@classes/_Base';

class Company extends _Base {
    constructor(company) {
        super(company);
        this.type = 'company';
        this.name = company.name;
        this.address = company.address;
        this.addressExtra = company.addressExtra;
        this.zipcode = company.zipcode;
        this.city = company.city;
        this.country = company.country;
        this.standardRate = Number(company.standardRate);
        this.startingYear = Number(company.startingYear);
        this.title = company.title;
        this.companyNameNice = company.companyNameNice;
        this.invoiceText = company.invoiceText;
        this.invoiceTextEnglish = company.invoiceTextEnglish;
        this.color1 = company.color1;
        this.color2 = company.color2;
        this.logoUrl = company.logoUrl;
        this.footerImageUrl = company.footerImageUrl;
        this.usesMail = company.usesMail === "1";
        this.usesGoogleDrive = company.usesGoogleDrive === "1";
        this.usesAcumulus = company.usesAcumulus === "1";
        this.coc = company.coc;
        this.vat = company.vat;
        this.bankName = company.bankName;
        this.bankAddress = company.bankAddress;
        this.iban = company.iban;
        this.bic = company.bic;
        this.companySameAsEmployee = company.companySameAsEmployee === "1";
        this.injectStyle();
    }

    injectStyle() {
        let style, rule;
        style = document.createElement('style');
        rule = '.office-color { background: ' + this.color1 + '!important; color: ' + this.color2 + '; }';
        style.type = 'text/css';
        style.innerHTML = rule;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    toBackend() {
        let company = {};
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                company[key] = this[key];
            }
        }
        company.usesMail = this.usesMail ? '1' : '0';
        company.usesGoogleDrive = this.usesGoogleDrive ? '1' : '0';
        company.usesAcumulus = this.usesAcumulus ? '1' : '0';
        company.companySameAsEmployee = this.companySameAsEmployee ? '1' : '0';
        return company;
    }

}

export default Company