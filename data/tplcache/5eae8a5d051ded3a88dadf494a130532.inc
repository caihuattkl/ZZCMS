<li>
							<a title="[field:fulltitle/]" href="[field:arcurl /]">[field:title /]</a>
							<div class="ptxt">
                            <p class="pic">
                                [field:array runphp='yes']@me = (empty(@me['litpic']) ? "" : "<a href="{@me['arcurl']}" target="_blank"><img src='{@me['litpic']}'/></a>"); [/field:array]
                            </p>                            
                            <p class="txt">[field:descriptions function='cn_substr(@me,380)' /]...［<a href="[field:arcurl /]" target="_blank" class="fontblue">详细</a>］</p>
                        </div>
						</li>