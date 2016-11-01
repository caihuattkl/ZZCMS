<li>
							<a title="[field:fulltitle/]" href="[field:arcurl /]">[field:title /]</a>
							<div class="ptxt">
                            <p class="pic">
                                <a href="[field:arcurl /]" target="_blank">
                                    <img src="[field:picname /]" alt="[field:fulltitle/]" width="110" height="110"></a>
                                    {dede:field.litpic runphp="yes"}if (@me!=''){@me= "<img src='".@me."'/>";}{/dede:field.litpic}
                                 </p>                            
                            <p class="txt">[field:descriptions function='cn_substr(@me,380)' /]...［<a href="[field:arcurl /]" target="_blank" class="fontblue">详细</a>］</p>
                        </div>
						</li>