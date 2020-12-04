const progressBarTemplate = `<div class="progress">
                                <div class="progress__top">
                                    <div class="progress__label">{title}</div>
                                    <div class="progress__value">{value}</div>
                                </div>
                                <div class="progress__bottom">
                                    <div class="progress__bar" style="width:{value}% ">
                                        <div class="progress__bar-loader progress__bar-loader--animate"></div>
                                    </div>
                                </div>
                            </div>`;

                            
export {progressBarTemplate};