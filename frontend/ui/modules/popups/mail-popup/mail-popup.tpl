<div class="overlay">
    <div class="popup__container">
        <div class="popup">
            <div class="popup__body">
                <div class="mail__container">
                    <div class="popup__content mail">
                        <div class="mail__addresses mail__section">
                            <div class="mail__info-row">
                                <div class="mail__label">
                                    Van
                                </div>
                                <div class="mail__row-content">
                                    <select
                                            ng-if="isUnsent()"
                                            ng-options="member as member.name for (index, member) in office.members"
                                            ng-model="mail.member"></select>
                                    <div ng-if="!isUnsent()">
                                        {{mail.member.email}}
                                    </div>
                                </div>
                            </div>
                            <div class="mail__info-row">
                                <div class="mail__label">
                                    Aan
                                </div>
                                <div class="mail__row-content">
                                    <input
                                            ng-model="mail.receiver"
                                            ng-if="isUnsent()"
                                            type="text">
                                    <div ng-if="!isUnsent()">
                                        {{mail.receiver}}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mail__subject mail__section">
                            <div class="mail__info-row">
                                <div class="mail__label">
                                    Onderwerp
                                </div>
                                <div class="mail__row-content">
                                    <input
                                            ng-model="mail.subject"
                                            ng-if="isUnsent()"
                                            type="text">
                                    <div ng-if="!isUnsent()">
                                        {{mail.subject}}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mail__content">
                    <textarea
                            ng-if="isUnsent()"
                            ng-model="mail.content"></textarea>

                            <div ng-if="!isUnsent()" ng-bind-html="trustAsHtml(formatContent(mail.content))"></div>

                            <div class="member__mail-footer" ng-bind-html="trustAsHtml(mail.member.mailFooter)"></div>
                        </div>

                        <div class="mail__attachements">
                            <div class="attachement">
                                <div class="attachement__icon">
                                    <i class="fas fa-paperclip"></i>
                                </div>
                                <div class="attachement__title">
                                    {{document.getPDFname()}}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mail__tools">
                        <select
                            ng-if="isUnsent()"
                            ng-options="type as type for (index, type) in types"
                            ng-model="mail.mailType"></select>
                    </div>
                </div>



            <div class="popup__footer" >
                <div
                    ng-if="isUnsent()"
                    ng-click="send()"
                    class="mail__button">
                    Verzenden
                </div>
            </div>
        </div>
    </div>

    <div
        ng-click="close()"
        class="popup__close">
    </div>
</div>