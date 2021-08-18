// Set a variable for our button element.
const scrollToTopButton = document.getElementById('js-top');

// Let's set up a function that shows our scroll-to-top button if we scroll beyond a certain height of the window.
const scrollFunc = () => {
  // Get the current scroll value
  let y = window.scrollY;
  
  // If the scroll value is greater than a certain window height, let's add a class to the scroll-to-top button to show it!
  if (y > 400) {
    scrollToTopButton.className = "top-link show";
  } else {
    scrollToTopButton.className = "top-link hide";
  }
};

window.addEventListener("scroll", scrollFunc);

const scrollToTop = () => {
  // Let's set a variable for the number of pixels we are from the top of the document.
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  
  // If that number is greater than 0, we'll scroll back to 0, or the top of the document.
  // We'll also animate that scroll with requestAnimationFrame:
  // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    // ScrollTo takes an x and a y coordinate.
    // Increase the '10' value to get a smoother/slower scroll!
    window.scrollTo(0, c - c / 10);
  }
};

// When the button is clicked, run our ScrolltoTop function above!
scrollToTopButton.onclick = function(e) 
{
  e.preventDefault();
  scrollToTop();
}

function updateRequirement(weapons) 
{
    // An object that holds the current stats inputted.
    var currentStats =
    {
        strValue: document.getElementById("str").value,
        dexValue: document.getElementById("dex").value,
        intValue: document.getElementById("int").value,
        fthValue: document.getElementById("fth").value,
        endValue: document.getElementById("end").value
    }

    // Prevent input from being out of bounds.
    inBounds(currentStats);

    // Iterate through the weapons array and one by one check its eligibility to be wielded and number of swings that can be performed.
    for (var i = 0; i < weapons.length; i++)
    {
        eligibility(weapons[i], currentStats.strValue, currentStats.dexValue, currentStats.intValue, currentStats.fthValue);
        swings(weapons[i], currentStats.endValue);
    }
}

// Check if the weapon passed is wieldable or not.
function eligibility(weapon, str, dex, int, fth)
{
    // Check if it's one-handable
    if (str >= weapon.strReq && dex >= weapon.dexReq && int >= weapon.intReq && fth >= weapon.fthReq)
    {
        weapon.id1H.textContent = "Yes";
        weapon.id2H.textContent = "Yes";
    }
    // Check if it's two-handable.
    else if (str >= (Math.ceil(weapon.strReq / 1.5)) && dex >= weapon.dexReq && int >= weapon.intReq && fth >= weapon.fthReq)
    {
        weapon.id1H.textContent = "No";
        weapon.id2H.textContent = "Yes";
    }
    else
    {
        weapon.id1H.textContent = "No";
        weapon.id2H.textContent = "No";
    }
}

// Check how many swings that can be performed given the player's endurance.
function swings(weapon, end)
{
    var remainingEndurance = staminaPool(end);

    weapon.idLightStamina1H.textContent = Math.ceil(remainingEndurance/weapon.lightStamina1H);

    // If the weapon cannot be two-handed then display blank message here, the html will display something different.
    if (weapon.lightStamina2H != 1)
    {
        weapon.idLightStamina2H.textContent = Math.ceil(remainingEndurance/weapon.lightStamina2H);
    }
    else
    {
        weapon.idLightStamina2H.textContent = "";
    }

    var counter = 0;

    // Calculate how many one hand heavies the player can perform.
    while (remainingEndurance > 0)
    {
        remainingEndurance = remainingEndurance - weapon.heavyStamina1H1;
        counter++;

        if (remainingEndurance <= 0)
            break;

        remainingEndurance = remainingEndurance - weapon.heavyStamina1H2;
        counter++;

        if (remainingEndurance <= 0)
            break;
    }

    weapon.idHeavyStamina1H.textContent = counter;

    // Reset the player's stamina and swing counter.
    remainingEndurance = staminaPool(end);
    counter = 0;

    // Calculate how many two hand heavies the player can perform.
    while (remainingEndurance > 0)
    {
        // If the weapon cost no stamina to use with its two hand heavy.
        if (weapon.heavyStamina2H1 == 1)
        {
            counter = "";
            break;
        }

        remainingEndurance = remainingEndurance - weapon.heavyStamina2H1;
        counter++;

        if (remainingEndurance <= 0)
            break;

        remainingEndurance = remainingEndurance - weapon.heavyStamina2H2;
        counter++;

        if (remainingEndurance <= 0)
            break;
    }

    weapon.idHeavyStamina2H.textContent = counter;
}

// Calculates how much stamina the player has.
function staminaPool(end)
{
    var stamina;

    if (end == 8)
        stamina = 88;
    if (end == 9)
        stamina = 90;
    if (end == 10)
        stamina = 91;
    if (end == 11)
        stamina = 93;
    if (end == 12)
        stamina = 95;
    if (end == 13)
        stamina = 97;
    if (end == 14)
        stamina = 98;
    if (end == 15)
        stamina = 100;
    if (end == 16)
        stamina = 102;
    if (end == 17)
        stamina = 104;
    if (end == 18)
        stamina = 106;
    if (end == 19)
        stamina = 108;
    if (end == 20)
        stamina = 110;
    if (end == 21)
        stamina = 112;
    if (end == 22)
        stamina = 115;
    if (end == 23)
        stamina = 117;
    if (end == 24)
        stamina = 119;
    if (end == 25)
        stamina = 121;
    if (end == 26)
        stamina = 124;
    if (end == 27)
        stamina = 126;
    if (end == 28)
        stamina = 129;
    if (end == 29)
        stamina = 131;
    if (end == 30)
        stamina = 133;
    if (end == 31)
        stamina = 136;
    if (end == 32)
        stamina = 139;
    if (end == 33)
        stamina = 141;
    if (end == 34)
        stamina = 144;
    if (end == 35)
        stamina = 146;
    if (end == 36)
        stamina = 149;
    if (end == 37)
        stamina = 152;
    if (end == 38)
        stamina = 154;
    if (end == 39)
        stamina = 157;
    if (end >= 40)
        stamina = 160;

    if(document.getElementById("FAP").checked)
    {
        stamina = stamina * 1.20;
    }

    return stamina;
}

// Ensures that the stats remain in bounds.
function inBounds(stats)
{
    if (stats.strValue <= 8)
    {
        document.getElementById("str").value = 9;
        stats.strValue = 9;
    }

    if (stats.strValue == 100)
    {
        document.getElementById("str").value = 99;
        stats.strValue = 99;
    }

    if (stats.dexValue <= 7)
    {
        document.getElementById("dex").value = 8;
        stats.dexValue = 8;
    }

    if (stats.dexValue == 100)
    {
        document.getElementById("dex").value = 99;
        stats.dexValue = 99;
    }

    if (stats.intValue <= 7)
    {
        document.getElementById("int").value = 8;
        stats.intValue = 8;
    }

    if (stats.intValue == 100)
    {
        document.getElementById("int").value = 99;
        stats.intValue = 99;
    }

    if (stats.fthValue <= 7)
    {
        document.getElementById("fth").value = 8;
        stats.fthValue = 8;
    }

    if (stats.fthValue == 100)
    {
        document.getElementById("fth").value = 99;
        stats.fthValue = 99;
    }

    if (stats.endValue <= 7)
    {
        document.getElementById("end").value = 8;
        stats.endValue = 8;
    }

    if (stats.endValue == 100)
    {
        document.getElementById("end").value = 99;
        stats.endValue = 99;
    }

}

// These functions increase/decrease the stats of their respective name by one.
function increaseStr()
{
    var strValue = document.getElementById("str").value;
    // If str is at 99 then don't increment up, this explanation applies below as well.
    if (!(document.getElementById("str").value == 99))
    {
        strValue++;
    }
    document.getElementById("str").value = strValue;
    updateRequirement(weapons);
}   

function decreaseStr()
{
    var strValue = document.getElementById("str").value;
    if (!(document.getElementById("str").value == 9))
    {
        strValue--;
    }
    document.getElementById("str").value = strValue;
    updateRequirement(weapons);
}

function increaseDex()
{
    var dexValue = document.getElementById("dex").value;
    if (!(document.getElementById("dex").value == 99))
    {
        dexValue++;
    }
    document.getElementById("dex").value = dexValue;
    updateRequirement(weapons);
}   

function decreaseDex()
{
    var dexValue = document.getElementById("dex").value;
    if (!(document.getElementById("dex").value == 8))
    {
        dexValue--;
    }
    document.getElementById("dex").value = dexValue;
    updateRequirement(weapons);
}

function increaseInt()
{
    var intValue = document.getElementById("int").value;
    if (!(document.getElementById("int").value == 99))
    {
        intValue++;
    }
    document.getElementById("int").value = intValue;
    updateRequirement(weapons);
}   

function decreaseInt()
{
    var intValue = document.getElementById("int").value;
    if (!(document.getElementById("int").value == 8))
    {
        intValue--;
    }
    document.getElementById("int").value = intValue;
    updateRequirement(weapons);
}

function increaseFth()
{
    var fthValue = document.getElementById("fth").value;
    if (!(document.getElementById("fth").value == 99))
    {
        fthValue++;
    }
    document.getElementById("fth").value = fthValue;
    updateRequirement(weapons);
}   

function decreaseFth()
{
    var fthValue = document.getElementById("fth").value;
    if (!(document.getElementById("fth").value == 8))
    {
        fthValue--;
    }
    document.getElementById("fth").value = fthValue;
    updateRequirement(weapons);
}

function increaseEnd()
{
    var endValue = document.getElementById("end").value;
    if (!(document.getElementById("end").value == 99))
    {
        endValue++;
    }
    document.getElementById("end").value = endValue;
    updateRequirement(weapons);
}   

function decreaseEnd()
{
    var endValue = document.getElementById("end").value;
    if (!(document.getElementById("end").value == 8))
    {
        endValue--;
    }
    document.getElementById("end").value = endValue;
    updateRequirement(weapons);
}

// End of increase/decrease section.

document.addEventListener("DOMContentLoaded", function(event) 
{ 
    // Initialize all weapons and their stats on web page load only once.
    var weapons = allWeapons();

    // Run this function when the web page first loads to present the default wieldability status's.
    updateRequirement(weapons);

    // All event listeners to check if immediate input through typing causes wieldable text to change.
    document.getElementById("str").addEventListener("change", function () { updateRequirement(weapons); })
    document.getElementById("dex").addEventListener("change", function () { updateRequirement(weapons); })
    document.getElementById("int").addEventListener("change", function () { updateRequirement(weapons); })
    document.getElementById("fth").addEventListener("change", function () { updateRequirement(weapons); })
    document.getElementById("end").addEventListener("change", function () { updateRequirement(weapons); })
    document.getElementById("FAP").addEventListener("change", function () { updateRequirement(weapons); })

    document.querySelectorAll('.collapsible-button').forEach(button =>
        {
            button.addEventListener("click", () =>
            {
                const collapsibleContent = button.nextElementSibling;
                button.classList.toggle('collapsible-button-active');
                if(button.classList.contains('collapsible-button-active'))
                {
                    collapsibleContent.style.maxHeight = collapsibleContent.scrollHeight + 'px';
                }
                else
                {
                    collapsibleContent.style.maxHeight = 0;
                }
            });
        });
});

document.addEventListener('keydown', function (event) {
    if ((event.keyCode === 13 || event.keyCode === 9) && event.target.nodeName === 'INPUT') {
        var form = event.target.form;
        var index = Array.prototype.indexOf.call(form, event.target);
        form.elements[index + 3].focus();
        event.preventDefault();
    }
});

document.getElementById("end").addEventListener('keydown', function (event) {
    if ((event.keyCode === 13 || event.keyCode === 9) && event.target.nodeName === 'INPUT') {
        var form = event.target.form;
        var index = Array.prototype.indexOf.call(form, event.target);
        document.getElementById("end").blur();
        event.preventDefault();
    }
  });

// Creating objects for every weapon to be used for updateRequirement.
function allWeapons()
{
    var dagger = 
    {
        strReq: 5,
        dexReq: 8,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 14,
        lightStamina2H: 24,
        heavyStamina1H1: 30,
        heavyStamina1H2: 30,
        heavyStamina2H1: 40,
        heavyStamina2H2: 40,
        id1H: document.getElementById("dagger-1H-wieldable-text"),
        id2H: document.getElementById("dagger-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("dagger-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("dagger-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("dagger-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("dagger-2H-heavy-swings-text")
    };

    var banditKnife =
    {
        strReq: 6,
        dexReq: 12,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 14,
        lightStamina2H: 24,
        heavyStamina1H1: 30,
        heavyStamina1H2: 30,
        heavyStamina2H1: 40,
        heavyStamina2H2: 40,
        id1H: document.getElementById("bandit's-knife-1H-wieldable-text"),
        id2H: document.getElementById("bandit's-knife-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("bandit's-knife-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("bandit's-knife-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("bandit's-knife-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("bandit's-knife-2H-heavy-swings-text")
    };

    var darkSilverTracer =
    {
        strReq: 6,
        dexReq: 25,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 14,
        lightStamina2H: 24,
        heavyStamina1H1: 45,
        heavyStamina1H2: 45,
        heavyStamina2H1: 65,
        heavyStamina2H2: 65,
        id1H: document.getElementById("dark-silver-tracer-1H-wieldable-text"),
        id2H: document.getElementById("dark-silver-tracer-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("dark-silver-tracer-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("dark-silver-tracer-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("dark-silver-tracer-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("dark-silver-tracer-2H-heavy-swings-text")
    };

    var ghostBlade =
    {
        strReq: 5,
        dexReq: 8,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 14,
        lightStamina2H: 24,
        heavyStamina1H1: 30,
        heavyStamina1H2: 30,
        heavyStamina2H1: 40,
        heavyStamina2H2: 36,
        id1H: document.getElementById("ghost-blade-1H-wieldable-text"),
        id2H: document.getElementById("ghost-blade-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("ghost-blade-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("ghost-blade-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("ghost-blade-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("ghost-blade-2H-heavy-swings-text")
    };

    var parryingDagger =
    {
        strReq: 5,
        dexReq: 14,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 14,
        lightStamina2H: 24,
        heavyStamina1H1: 30,
        heavyStamina1H2: 30,
        heavyStamina2H1: 40,
        heavyStamina2H2: 40,
        id1H: document.getElementById("parrying-dagger-1H-wieldable-text"),
        id2H: document.getElementById("parrying-dagger-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("parrying-dagger-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("parrying-dagger-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("parrying-dagger-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("parrying-dagger-2H-heavy-swings-text")
    };

    var priscillaDagger =
    {
        strReq: 6,
        dexReq: 20,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 14,
        lightStamina2H: 24,
        heavyStamina1H1: 30,
        heavyStamina1H2: 30,
        heavyStamina2H1: 40,
        heavyStamina2H2: 40,
        id1H: document.getElementById("priscilla's-dagger-1H-wieldable-text"),
        id2H: document.getElementById("priscilla's-dagger-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("priscilla's-dagger-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("priscilla's-dagger-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("priscilla's-dagger-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("priscilla's-dagger-2H-heavy-swings-text")
    };

    var astoraStraightSword =
    {
        strReq: 10,
        dexReq: 10,
        intReq: 0,
        fthReq: 14,
        lightStamina1H: 20,
        lightStamina2H: 30,
        heavyStamina1H1: 45,
        heavyStamina1H2: 35,
        heavyStamina2H1: 40,
        heavyStamina2H2: 40,
        id1H: document.getElementById("astora's-straight-sword-1H-wieldable-text"),
        id2H: document.getElementById("astora's-straight-sword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("astora's-straight-sword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("astora's-straight-sword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("astora's-straight-sword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("astora's-straight-sword-2H-heavy-swings-text")
    };

    var balderSideSword =
    {
        strReq: 10,
        dexReq: 14,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 30,
        heavyStamina1H1: 48,
        heavyStamina1H2: 48,
        heavyStamina2H1: 55,
        heavyStamina2H2: 55,
        id1H: document.getElementById("balder-side-sword-1H-wieldable-text"),
        id2H: document.getElementById("balder-side-sword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("balder-side-sword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("balder-side-sword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("balder-side-sword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("balder-side-sword-2H-heavy-swings-text")
    };

    var barbedStraightSword =
    {
        strReq: 10,
        dexReq: 10,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 30,
        heavyStamina1H1: 32,
        heavyStamina1H2: 32,
        heavyStamina2H1: 40,
        heavyStamina2H2: 40,
        id1H: document.getElementById("barbed-straight-sword-1H-wieldable-text"),
        id2H: document.getElementById("barbed-straight-sword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("barbed-straight-sword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("barbed-straight-sword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("barbed-straight-sword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("barbed-straight-sword-2H-heavy-swings-text")
    };

    var broadsword =
    {
        strReq: 10,
        dexReq: 10,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 30,
        heavyStamina1H1: 32,
        heavyStamina1H2: 32,
        heavyStamina2H1: 40,
        heavyStamina2H2: 40,
        id1H: document.getElementById("broadsword-1H-wieldable-text"),
        id2H: document.getElementById("broadsword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("broadsword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("broadsword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("broadsword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("broadsword-2H-heavy-swings-text")
    };

    var brokenStraightSword =
    {
        strReq: 8,
        dexReq: 8,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 30,
        heavyStamina1H1: 45,
        heavyStamina1H2: 35,
        heavyStamina2H1: 40,
        heavyStamina2H2: 40,
        id1H: document.getElementById("broken-straight-sword-1H-wieldable-text"),
        id2H: document.getElementById("broken-straight-sword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("broken-straight-sword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("broken-straight-sword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("broken-straight-sword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("broken-straight-sword-2H-heavy-swings-text")
    };

    var crystalStraightSword =
    {
        strReq: 16,
        dexReq: 10,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 30,
        heavyStamina1H1: 45,
        heavyStamina1H2: 35,
        heavyStamina2H1: 40,
        heavyStamina2H2: 40,
        id1H: document.getElementById("crystal-straight-sword-1H-wieldable-text"),
        id2H: document.getElementById("crystal-straight-sword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("crystal-straight-sword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("crystal-straight-sword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("crystal-straight-sword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("crystal-straight-sword-2H-heavy-swings-text")
    };

    var darkSword =
    {
        strReq: 16,
        dexReq: 16,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 30,
        heavyStamina1H1: 35,
        heavyStamina1H2: 40,
        heavyStamina2H1: 50,
        heavyStamina2H2: 55,
        id1H: document.getElementById("dark-sword-1H-wieldable-text"),
        id2H: document.getElementById("dark-sword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("dark-sword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("dark-sword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("dark-sword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("dark-sword-2H-heavy-swings-text")
    };

    var drakeSword =
    {
        strReq: 16,
        dexReq: 10,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 30,
        heavyStamina1H1: 32,
        heavyStamina1H2: 32,
        heavyStamina2H1: 60,
        heavyStamina2H2: 60,
        id1H: document.getElementById("drake-sword-1H-wieldable-text"),
        id2H: document.getElementById("drake-sword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("drake-sword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("drake-sword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("drake-sword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("drake-sword-2H-heavy-swings-text")
    };

    var longsword =
    {
        strReq: 10,
        dexReq: 10,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 30,
        heavyStamina1H1: 45,
        heavyStamina1H2: 35,
        heavyStamina2H1: 40,
        heavyStamina2H2: 40,
        id1H: document.getElementById("longsword-1H-wieldable-text"),
        id2H: document.getElementById("longsword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("longsword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("longsword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("longsword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("longsword-2H-heavy-swings-text")
    };
    
    var shortsword =
    {
        strReq: 8,
        dexReq: 10,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 30,
        heavyStamina1H1: 45,
        heavyStamina1H2: 35,
        heavyStamina2H1: 40,
        heavyStamina2H2: 40,
        id1H: document.getElementById("shortsword-1H-wieldable-text"),
        id2H: document.getElementById("shortsword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("shortsword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("shortsword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("shortsword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("shortsword-2H-heavy-swings-text")
    };

    var silverKnightStraightSword =
    {
        strReq: 16,
        dexReq: 22,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 30,
        heavyStamina1H1: 40,
        heavyStamina1H2: 40,
        heavyStamina2H1: 55,
        heavyStamina2H2: 55,
        id1H: document.getElementById("silver-knight-straight-sword-1H-wieldable-text"),
        id2H: document.getElementById("silver-knight-straight-sword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("silver-knight-straight-sword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("silver-knight-straight-sword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("silver-knight-straight-sword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("silver-knight-straight-sword-2H-heavy-swings-text")
    };

    var straightSwordHilt =
    {
        strReq: 6,
        dexReq: 6,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 30,
        heavyStamina1H1: 32,
        heavyStamina1H2: 32,
        heavyStamina2H1: 40,
        heavyStamina2H2: 40,
        id1H: document.getElementById("straight-sword-hilt-1H-wieldable-text"),
        id2H: document.getElementById("straight-sword-hilt-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("straight-sword-hilt-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("straight-sword-hilt-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("straight-sword-hilt-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("straight-sword-hilt-2H-heavy-swings-text")
    };

    var sunlightStraightSword =
    {
        strReq: 12,
        dexReq: 12,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 30,
        heavyStamina1H1: 45,
        heavyStamina1H2: 35,
        heavyStamina2H1: 40,
        heavyStamina2H2: 40,
        id1H: document.getElementById("sunlight-straight-sword-1H-wieldable-text"),
        id2H: document.getElementById("sunlight-straight-sword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("sunlight-straight-sword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("sunlight-straight-sword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("sunlight-straight-sword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("sunlight-straight-sword-2H-heavy-swings-text")
    };

    var abyssGreatsword =
    {
        strReq: 22,
        dexReq: 18,
        intReq: 18,
        fthReq: 18,
        lightStamina1H: 30,
        lightStamina2H: 40,
        heavyStamina1H1: 70,
        heavyStamina1H2: 70,
        heavyStamina2H1: 110,
        heavyStamina2H2: 110,
        id1H: document.getElementById("abyss-greatsword-1H-wieldable-text"),
        id2H: document.getElementById("abyss-greatsword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("abyss-greatsword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("abyss-greatsword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("abyss-greatsword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("abyss-greatsword-2H-heavy-swings-text")
    };

    var bastardSword =
    {
        strReq: 16,
        dexReq: 10,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 30,
        lightStamina2H: 40,
        heavyStamina1H1: 60,
        heavyStamina1H2: 60,
        heavyStamina2H1: 72,
        heavyStamina2H2: 72,
        id1H: document.getElementById("bastard-sword-1H-wieldable-text"),
        id2H: document.getElementById("bastard-sword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("bastard-sword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("bastard-sword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("bastard-sword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("bastard-sword-2H-heavy-swings-text")
    };

    var blackKnightSword =
    {
        strReq: 20,
        dexReq: 18,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 30,
        lightStamina2H: 40,
        heavyStamina1H1: 70,
        heavyStamina1H2: 70,
        heavyStamina2H1: 90,
        heavyStamina2H2: 90,
        id1H: document.getElementById("black-knight-sword-1H-wieldable-text"),
        id2H: document.getElementById("black-knight-sword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("black-knight-sword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("black-knight-sword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("black-knight-sword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("black-knight-sword-2H-heavy-swings-text")
    };

    var claymore =
    {
        strReq: 16,
        dexReq: 10,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 30,
        lightStamina2H: 40,
        heavyStamina1H1: 70,
        heavyStamina1H2: 50,
        heavyStamina2H1: 72,
        heavyStamina2H2: 72,
        id1H: document.getElementById("claymore-1H-wieldable-text"),
        id2H: document.getElementById("claymore-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("claymore-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("claymore-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("claymore-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("claymore-2H-heavy-swings-text")
    };

    var crystalGreatsword =
    {
        strReq: 20,
        dexReq: 10,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 30,
        lightStamina2H: 40,
        heavyStamina1H1: 60,
        heavyStamina1H2: 60,
        heavyStamina2H1: 72,
        heavyStamina2H2: 72,
        id1H: document.getElementById("crystal-greatsword-1H-wieldable-text"),
        id2H: document.getElementById("crystal-greatsword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("crystal-greatsword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("crystal-greatsword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("crystal-greatsword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("crystal-greatsword-2H-heavy-swings-text")
    };

    var flamberge =
    {
        strReq: 16,
        dexReq: 14,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 30,
        lightStamina2H: 40,
        heavyStamina1H1: 60,
        heavyStamina1H2: 60,
        heavyStamina2H1: 75,
        heavyStamina2H2: 75,
        id1H: document.getElementById("flamberge-1H-wieldable-text"),
        id2H: document.getElementById("flamberge-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("flamberge-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("flamberge-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("flamberge-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("flamberge-2H-heavy-swings-text")
    };

    var greatLordGreatsword =
    {
        strReq: 20,
        dexReq: 10,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 30,
        lightStamina2H: 40,
        heavyStamina1H1: 80,
        heavyStamina1H2: 80,
        heavyStamina2H1: 100,
        heavyStamina2H2: 100,
        id1H: document.getElementById("great-lord-greatsword-1H-wieldable-text"),
        id2H: document.getElementById("great-lord-greatsword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("great-lord-greatsword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("great-lord-greatsword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("great-lord-greatsword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("great-lord-greatsword-2H-heavy-swings-text")
    };

    var greatswordOfArtorias =
    {
        strReq: 24,
        dexReq: 18,
        intReq: 20,
        fthReq: 20,
        lightStamina1H: 30,
        lightStamina2H: 40,
        heavyStamina1H1: 80,
        heavyStamina1H2: 80,
        heavyStamina2H1: 100,
        heavyStamina2H2: 100,
        id1H: document.getElementById("greatsword-of-artorias-1H-wieldable-text"),
        id2H: document.getElementById("greatsword-of-artorias-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("greatsword-of-artorias-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("greatsword-of-artorias-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("greatsword-of-artorias-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("greatsword-of-artorias-2H-heavy-swings-text")
    };

    var greatswordOfArtoriasCursed =
    {
        strReq: 24,
        dexReq: 18,
        intReq: 18,
        fthReq: 18,
        lightStamina1H: 30,
        lightStamina2H: 40,
        heavyStamina1H1: 80,
        heavyStamina1H2: 80,
        heavyStamina2H1: 100,
        heavyStamina2H2: 100,
        id1H: document.getElementById("greatsword-of-artorias-cursed-1H-wieldable-text"),
        id2H: document.getElementById("greatsword-of-artorias-cursed-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("greatsword-of-artorias-cursed-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("greatsword-of-artorias-cursed-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("greatsword-of-artorias-cursed-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("greatsword-of-artorias-cursed-2H-heavy-swings-text")
    };

    var manSerpentGreatsword =
    {
        strReq: 24,
        dexReq: 0,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 30,
        lightStamina2H: 40,
        heavyStamina1H1: 60,
        heavyStamina1H2: 60,
        heavyStamina2H1: 72,
        heavyStamina2H2: 72,
        id1H: document.getElementById("man-serpent-greatsword-1H-wieldable-text"),
        id2H: document.getElementById("man-serpent-greatsword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("man-serpent-greatsword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("man-serpent-greatsword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("man-serpent-greatsword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("man-serpent-greatsword-2H-heavy-swings-text")
    };

    var moonlightGreatsword =
    {
        strReq: 16,
        dexReq: 10,
        intReq: 28,
        fthReq: 0,
        lightStamina1H: 30,
        lightStamina2H: 40,
        heavyStamina1H1: 65,
        heavyStamina1H2: 65,
        heavyStamina2H1: 90,
        heavyStamina2H2: 90,
        id1H: document.getElementById("moonlight-greatsword-1H-wieldable-text"),
        id2H: document.getElementById("moonlight-greatsword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("moonlight-greatsword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("moonlight-greatsword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("moonlight-greatsword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("moonlight-greatsword-2H-heavy-swings-text")
    };

    var obsidianGreatsword =
    {
        strReq: 20,
        dexReq: 16,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 30,
        lightStamina2H: 40,
        heavyStamina1H1: 60,
        heavyStamina1H2: 60,
        heavyStamina2H1: 110,
        heavyStamina2H2: 110,
        id1H: document.getElementById("obsidian-greatsword-1H-wieldable-text"),
        id2H: document.getElementById("obsidian-greatsword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("obsidian-greatsword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("obsidian-greatsword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("obsidian-greatsword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("obsidian-greatsword-2H-heavy-swings-text")
    };

    var stoneGreatsword =
    {
        strReq: 40,
        dexReq: 10,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 30,
        lightStamina2H: 40,
        heavyStamina1H1: 65,
        heavyStamina1H2: 65,
        heavyStamina2H1: 72,
        heavyStamina2H2: 72,
        id1H: document.getElementById("stone-greatsword-1H-wieldable-text"),
        id2H: document.getElementById("stone-greatsword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("stone-greatsword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("stone-greatsword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("stone-greatsword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("stone-greatsword-2H-heavy-swings-text")
    };

    var blackKnightGreatsword =
    {
        strReq: 32,
        dexReq: 18,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 45,
        lightStamina2H: 60,
        heavyStamina1H1: 80,
        heavyStamina1H2: 80,
        heavyStamina2H1: 100,
        heavyStamina2H2: 100,
        id1H: document.getElementById("black-knight-greatsword-1H-wieldable-text"),
        id2H: document.getElementById("black-knight-greatsword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("black-knight-greatsword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("black-knight-greatsword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("black-knight-greatsword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("black-knight-greatsword-2H-heavy-swings-text")
    };

    var demonGreatMachete =
    {
        strReq: 40,
        dexReq: 0,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 45,
        lightStamina2H: 60,
        heavyStamina1H1: 80,
        heavyStamina1H2: 80,
        heavyStamina2H1: 100,
        heavyStamina2H2: 100,
        id1H: document.getElementById("demon-great-machete-1H-wieldable-text"),
        id2H: document.getElementById("demon-great-machete-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("demon-great-machete-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("demon-great-machete-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("demon-great-machete-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("demon-great-machete-2H-heavy-swings-text")
    };

    var dragonGreatsword =
    {
        strReq: 50,
        dexReq: 10,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 45,
        lightStamina2H: 60,
        heavyStamina1H1: 70,
        heavyStamina1H2: 80,
        heavyStamina2H1: 100,
        heavyStamina2H2: 100,
        id1H: document.getElementById("dragon-greatsword-1H-wieldable-text"),
        id2H: document.getElementById("dragon-greatsword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("dragon-greatsword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("dragon-greatsword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("dragon-greatsword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("dragon-greatsword-2H-heavy-swings-text")
    };

    var greatsword =
    {
        strReq: 28,
        dexReq: 10,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 45,
        lightStamina2H: 60,
        heavyStamina1H1: 80,
        heavyStamina1H2: 80,
        heavyStamina2H1: 100,
        heavyStamina2H2: 100,
        id1H: document.getElementById("greatsword-1H-wieldable-text"),
        id2H: document.getElementById("greatsword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("greatsword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("greatsword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("greatsword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("greatsword-2H-heavy-swings-text")
    };

    var zweihander =
    {
        strReq: 24,
        dexReq: 10,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 45,
        lightStamina2H: 60,
        heavyStamina1H1: 70,
        heavyStamina1H2: 80,
        heavyStamina2H1: 100,
        heavyStamina2H2: 100,
        id1H: document.getElementById("zweihander-1H-wieldable-text"),
        id2H: document.getElementById("zweihander-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("zweihander-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("zweihander-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("zweihander-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("zweihander-2H-heavy-swings-text")
    };

    var falchion =
    {
        strReq: 9,
        dexReq: 13,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 30,
        heavyStamina1H1: 40,
        heavyStamina1H2: 44,
        heavyStamina2H1: 60,
        heavyStamina2H2: 65,
        id1H: document.getElementById("falchion-1H-wieldable-text"),
        id2H: document.getElementById("falchion-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("falchion-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("falchion-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("falchion-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("falchion-2H-heavy-swings-text")
    };

    var goldTracer =
    {
        strReq: 9,
        dexReq: 25,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 30,
        heavyStamina1H1: 20,
        heavyStamina1H2: 18,
        heavyStamina2H1: 22,
        heavyStamina2H2: 22,
        id1H: document.getElementById("gold-tracer-1H-wieldable-text"),
        id2H: document.getElementById("gold-tracer-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("gold-tracer-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("gold-tracer-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("gold-tracer-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("gold-tracer-2H-heavy-swings-text")
    };

    var jaggedGhostBlade =
    {
        strReq: 7,
        dexReq: 0,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 30,
        heavyStamina1H1: 40,
        heavyStamina1H2: 40,
        heavyStamina2H1: 60,
        heavyStamina2H2: 60,
        id1H: document.getElementById("jagged-ghost-blade-1H-wieldable-text"),
        id2H: document.getElementById("jagged-ghost-blade-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("jagged-ghost-blade-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("jagged-ghost-blade-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("jagged-ghost-blade-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("jagged-ghost-blade-2H-heavy-swings-text")
    };

    var paintingGuardianSword =
    {
        strReq: 7,
        dexReq: 20,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 30,
        heavyStamina1H1: 40,
        heavyStamina1H2: 54,
        heavyStamina2H1: 60,
        heavyStamina2H2: 75,
        id1H: document.getElementById("painting-guardian-sword-1H-wieldable-text"),
        id2H: document.getElementById("painting-guardian-sword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("painting-guardian-sword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("painting-guardian-sword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("painting-guardian-sword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("painting-guardian-sword-2H-heavy-swings-text")
    };

    var quelaagFurySword =
    {
        strReq: 11,
        dexReq: 13,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 30,
        heavyStamina1H1: 50,
        heavyStamina1H2: 50,
        heavyStamina2H1: 70,
        heavyStamina2H2: 70,
        id1H: document.getElementById("quelaag-furysword-1H-wieldable-text"),
        id2H: document.getElementById("quelaag-furysword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("quelaag-furysword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("quelaag-furysword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("quelaag-furysword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("quelaag-furysword-2H-heavy-swings-text")
    };

    var scimitar =
    {
        strReq: 7,
        dexReq: 13,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 30,
        heavyStamina1H1: 40,
        heavyStamina1H2: 44,
        heavyStamina2H1: 60,
        heavyStamina2H2: 65,
        id1H: document.getElementById("scimitar-1H-wieldable-text"),
        id2H: document.getElementById("scimitar-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("scimitar-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("scimitar-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("scimitar-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("scimitar-2H-heavy-swings-text")
    };

    var shotel =
    {
        strReq: 9,
        dexReq: 14,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 30,
        heavyStamina1H1: 45,
        heavyStamina1H2: 45,
        heavyStamina2H1: 66,
        heavyStamina2H2: 66,
        id1H: document.getElementById("shotel-1H-wieldable-text"),
        id2H: document.getElementById("shotel-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("shotel-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("shotel-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("shotel-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("shotel-2H-heavy-swings-text")
    };

    var gravelordSword =
    {
        strReq: 24,
        dexReq: 13,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 30,
        lightStamina2H: 40,
        heavyStamina1H1: 65,
        heavyStamina1H2: 65,
        heavyStamina2H1: 70,
        heavyStamina2H2: 70,
        id1H: document.getElementById("gravelord-sword-1H-wieldable-text"),
        id2H: document.getElementById("gravelord-sword-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("gravelord-sword-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("gravelord-sword-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("gravelord-sword-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("gravelord-sword-2H-heavy-swings-text")
    };

    var murakumo =
    {
        strReq: 28,
        dexReq: 13,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 30,
        lightStamina2H: 40,
        heavyStamina1H1: 50,
        heavyStamina1H2: 50,
        heavyStamina2H1: 70,
        heavyStamina2H2: 70,
        id1H: document.getElementById("murakumo-1H-wieldable-text"),
        id2H: document.getElementById("murakumo-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("murakumo-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("murakumo-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("murakumo-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("murakumo-2H-heavy-swings-text")
    };

    var server =
    {
        strReq: 24,
        dexReq: 13,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 30,
        lightStamina2H: 40,
        heavyStamina1H1: 50,
        heavyStamina1H2: 50,
        heavyStamina2H1: 70,
        heavyStamina2H2: 70,
        id1H: document.getElementById("server-1H-wieldable-text"),
        id2H: document.getElementById("server-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("server-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("server-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("server-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("server-2H-heavy-swings-text")
    };

    var chaosBlade =
    {
        strReq: 16,
        dexReq: 14,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 24,
        lightStamina2H: 34,
        heavyStamina1H1: 62,
        heavyStamina1H2: 62,
        heavyStamina2H1: 120,
        heavyStamina2H2: 120,
        id1H: document.getElementById("chaos-blade-1H-wieldable-text"),
        id2H: document.getElementById("chaos-blade-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("chaos-blade-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("chaos-blade-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("chaos-blade-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("chaos-blade-2H-heavy-swings-text")
    };

    var iaito =
    {
        strReq: 14,
        dexReq: 20,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 24,
        lightStamina2H: 34,
        heavyStamina1H1: 62,
        heavyStamina1H2: 62,
        heavyStamina2H1: 72,
        heavyStamina2H2: 72,
        id1H: document.getElementById("iaito-1H-wieldable-text"),
        id2H: document.getElementById("iaito-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("iaito-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("iaito-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("iaito-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("iaito-2H-heavy-swings-text")
    };

    var uchigatana =
    {
        strReq: 14,
        dexReq: 14,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 24,
        lightStamina2H: 34,
        heavyStamina1H1: 54,
        heavyStamina1H2: 54,
        heavyStamina2H1: 60,
        heavyStamina2H2: 60,
        id1H: document.getElementById("uchigatana-1H-wieldable-text"),
        id2H: document.getElementById("uchigatana-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("uchigatana-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("uchigatana-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("uchigatana-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("uchigatana-2H-heavy-swings-text")
    };

    var washingPole =
    {
        strReq: 20,
        dexReq: 16,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 24,
        lightStamina2H: 34,
        heavyStamina1H1: 54,
        heavyStamina1H2: 54,
        heavyStamina2H1: 60,
        heavyStamina2H2: 60,
        id1H: document.getElementById("washing-pole-1H-wieldable-text"),
        id2H: document.getElementById("washing-pole-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("washing-pole-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("washing-pole-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("washing-pole-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("washing-pole-2H-heavy-swings-text")
    };

    var estoc =
    {
        strReq: 10,
        dexReq: 12,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 28,
        heavyStamina1H1: 45,
        heavyStamina1H2: 45,
        heavyStamina2H1: 60,
        heavyStamina2H2: 60,
        id1H: document.getElementById("estoc-1H-wieldable-text"),
        id2H: document.getElementById("estoc-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("estoc-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("estoc-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("estoc-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("estoc-2H-heavy-swings-text")
    };

    var mailBreaker =
    {
        strReq: 5,
        dexReq: 12,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 28,
        heavyStamina1H1: 50,
        heavyStamina1H2: 50,
        heavyStamina2H1: 65,
        heavyStamina2H2: 65,
        id1H: document.getElementById("mail-breaker-1H-wieldable-text"),
        id2H: document.getElementById("mail-breaker-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("mail-breaker-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("mail-breaker-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("mail-breaker-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("mail-breaker-2H-heavy-swings-text")
    };

    var rapier =
    {
        strReq: 7,
        dexReq: 12,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 28,
        heavyStamina1H1: 45,
        heavyStamina1H2: 45,
        heavyStamina2H1: 60,
        heavyStamina2H2: 60,
        id1H: document.getElementById("rapier-1H-wieldable-text"),
        id2H: document.getElementById("rapier-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("rapier-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("rapier-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("rapier-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("rapier-2H-heavy-swings-text")
    };

    var ricardRapier =
    {
        strReq: 8,
        dexReq: 20,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 28,
        heavyStamina1H1: 40,
        heavyStamina1H2: 52,
        heavyStamina2H1: 60,
        heavyStamina2H2: 76,
        id1H: document.getElementById("ricard's-rapier-1H-wieldable-text"),
        id2H: document.getElementById("ricard's-rapier-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("ricard's-rapier-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("ricard's-rapier-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("ricard's-rapier-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("ricard's-rapier-2H-heavy-swings-text")
    };

    var velkaRapier =
    {
        strReq: 8,
        dexReq: 16,
        intReq: 16,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 28,
        heavyStamina1H1: 40,
        heavyStamina1H2: 12,
        heavyStamina2H1: 60,
        heavyStamina2H2: 16,
        id1H: document.getElementById("velka's-rapier-1H-wieldable-text"),
        id2H: document.getElementById("velka's-rapier-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("velka's-rapier-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("velka's-rapier-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("velka's-rapier-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("velka's-rapier-2H-heavy-swings-text")
    };

    var battleAxe =
    {
        strReq: 12,
        dexReq: 8,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 25,
        lightStamina2H: 38,
        heavyStamina1H1: 50,
        heavyStamina1H2: 50,
        heavyStamina2H1: 68,
        heavyStamina2H2: 68,
        id1H: document.getElementById("battle-axe-1H-wieldable-text"),
        id2H: document.getElementById("battle-axe-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("battle-axe-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("battle-axe-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("battle-axe-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("battle-axe-2H-heavy-swings-text")
    };

    var butcherKnife =
    {
        strReq: 24,
        dexReq: 0,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 25,
        lightStamina2H: 38,
        heavyStamina1H1: 50,
        heavyStamina1H2: 50,
        heavyStamina2H1: 55,
        heavyStamina2H2: 75,
        id1H: document.getElementById("butcher-knife-1H-wieldable-text"),
        id2H: document.getElementById("butcher-knife-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("butcher-knife-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("butcher-knife-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("butcher-knife-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("butcher-knife-2H-heavy-swings-text")
    };

    var crescentAxe =
    {
        strReq: 18,
        dexReq: 12,
        intReq: 0,
        fthReq: 16,
        lightStamina1H: 25,
        lightStamina2H: 38,
        heavyStamina1H1: 50,
        heavyStamina1H2: 50,
        heavyStamina2H1: 68,
        heavyStamina2H2: 68,
        id1H: document.getElementById("crescent-axe-1H-wieldable-text"),
        id2H: document.getElementById("crescent-axe-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("crescent-axe-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("crescent-axe-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("crescent-axe-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("crescent-axe-2H-heavy-swings-text")
    };

    var gargoyleTailAxe =
    {
        strReq: 14,
        dexReq: 14,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 25,
        lightStamina2H: 38,
        heavyStamina1H1: 50,
        heavyStamina1H2: 50,
        heavyStamina2H1: 68,
        heavyStamina2H2: 68,
        id1H: document.getElementById("gargoyle-tail-axe-1H-wieldable-text"),
        id2H: document.getElementById("gargoyle-tail-axe-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("gargoyle-tail-axe-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("gargoyle-tail-axe-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("gargoyle-tail-axe-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("gargoyle-tail-axe-2H-heavy-swings-text")
    };

    var golemAxe =
    {
        strReq: 36,
        dexReq: 8,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 25,
        lightStamina2H: 38,
        heavyStamina1H1: 55,
        heavyStamina1H2: 55,
        heavyStamina2H1: 70,
        heavyStamina2H2: 70,
        id1H: document.getElementById("golem-axe-1H-wieldable-text"),
        id2H: document.getElementById("golem-axe-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("golem-axe-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("golem-axe-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("golem-axe-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("golem-axe-2H-heavy-swings-text")
    };

    var handAxe =
    {
        strReq: 8,
        dexReq: 8,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 25,
        lightStamina2H: 38,
        heavyStamina1H1: 50,
        heavyStamina1H2: 50,
        heavyStamina2H1: 68,
        heavyStamina2H2: 68,
        id1H: document.getElementById("hand-axe-1H-wieldable-text"),
        id2H: document.getElementById("hand-axe-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("hand-axe-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("hand-axe-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("hand-axe-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("hand-axe-2H-heavy-swings-text")
    };

    var blackKnightGreataxe =
    {
        strReq: 36,
        dexReq: 18,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 35,
        lightStamina2H: 48,
        heavyStamina1H1: 80,
        heavyStamina1H2: 80,
        heavyStamina2H1: 110,
        heavyStamina2H2: 110,
        id1H: document.getElementById("black-knight-greataxe-1H-wieldable-text"),
        id2H: document.getElementById("black-knight-greataxe-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("black-knight-greataxe-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("black-knight-greataxe-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("black-knight-greataxe-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("black-knight-greataxe-2H-heavy-swings-text")
    };

    var demonGreataxe =
    {
        strReq: 46,
        dexReq: 0,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 35,
        lightStamina2H: 48,
        heavyStamina1H1: 70,
        heavyStamina1H2: 70,
        heavyStamina2H1: 100,
        heavyStamina2H2: 100,
        id1H: document.getElementById("demon's-greataxe-1H-wieldable-text"),
        id2H: document.getElementById("demon's-greataxe-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("demon's-greataxe-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("demon's-greataxe-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("demon's-greataxe-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("demon's-greataxe-2H-heavy-swings-text")
    };

    var dragonKingGreataxe =
    {
        strReq: 50,
        dexReq: 8,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 35,
        lightStamina2H: 48,
        heavyStamina1H1: 74,
        heavyStamina1H2: 74,
        heavyStamina2H1: 110,
        heavyStamina2H2: 110,
        id1H: document.getElementById("dragon-king-greataxe-1H-wieldable-text"),
        id2H: document.getElementById("dragon-king-greataxe-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("dragon-king-greataxe-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("dragon-king-greataxe-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("dragon-king-greataxe-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("dragon-king-greataxe-2H-heavy-swings-text")
    };

    var greataxe =
    {
        strReq: 32,
        dexReq: 8,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 35,
        lightStamina2H: 48,
        heavyStamina1H1: 74,
        heavyStamina1H2: 74,
        heavyStamina2H1: 85,
        heavyStamina2H2: 85,
        id1H: document.getElementById("greataxe-1H-wieldable-text"),
        id2H: document.getElementById("greataxe-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("greataxe-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("greataxe-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("greataxe-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("greataxe-2H-heavy-swings-text")
    };

    var stoneGreataxe =
    {
        strReq: 48,
        dexReq: 10,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 35,
        lightStamina2H: 48,
        heavyStamina1H1: 65,
        heavyStamina1H2: 65,
        heavyStamina2H1: 80,
        heavyStamina2H2: 80,
        id1H: document.getElementById("stone-greataxe-1H-wieldable-text"),
        id2H: document.getElementById("stone-greataxe-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("stone-greataxe-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("stone-greataxe-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("stone-greataxe-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("stone-greataxe-2H-heavy-swings-text")
    };

    var blacksmithGiantHammer =
    {
        strReq: 16,
        dexReq: 0,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 25,
        lightStamina2H: 38,
        heavyStamina1H1: 65,
        heavyStamina1H2: 45,
        heavyStamina2H1: 75,
        heavyStamina2H2: 55,
        id1H: document.getElementById("blacksmith-giant-hammer-1H-wieldable-text"),
        id2H: document.getElementById("blacksmith-giant-hammer-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("blacksmith-giant-hammer-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("blacksmith-giant-hammer-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("blacksmith-giant-hammer-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("blacksmith-giant-hammer-2H-heavy-swings-text")
    };

    var blacksmithHammer =
    {
        strReq: 14,
        dexReq: 0,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 25,
        lightStamina2H: 38,
        heavyStamina1H1: 50,
        heavyStamina1H2: 50,
        heavyStamina2H1: 68,
        heavyStamina2H2: 68,
        id1H: document.getElementById("blacksmith-hammer-1H-wieldable-text"),
        id2H: document.getElementById("blacksmith-hammer-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("blacksmith-hammer-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("blacksmith-hammer-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("blacksmith-hammer-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("blacksmith-hammer-2H-heavy-swings-text")
    };

    var hammerOfVamos =
    {
        strReq: 14,
        dexReq: 0,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 25,
        lightStamina2H: 38,
        heavyStamina1H1: 50,
        heavyStamina1H2: 50,
        heavyStamina2H1: 68,
        heavyStamina2H2: 68,
        id1H: document.getElementById("hammer-of-vamos-1H-wieldable-text"),
        id2H: document.getElementById("hammer-of-vamos-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("hammer-of-vamos-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("hammer-of-vamos-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("hammer-of-vamos-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("hammer-of-vamos-2H-heavy-swings-text")
    };

    var club =
    {
        strReq: 10,
        dexReq: 0,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 25,
        lightStamina2H: 38,
        heavyStamina1H1: 65,
        heavyStamina1H2: 45,
        heavyStamina2H1: 75,
        heavyStamina2H2: 55,
        id1H: document.getElementById("club-1H-wieldable-text"),
        id2H: document.getElementById("club-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("club-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("club-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("club-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("club-2H-heavy-swings-text")
    };

    var mace =
    {
        strReq: 12,
        dexReq: 0,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 25,
        lightStamina2H: 38,
        heavyStamina1H1: 50,
        heavyStamina1H2: 50,
        heavyStamina2H1: 68,
        heavyStamina2H2: 68,
        id1H: document.getElementById("mace-1H-wieldable-text"),
        id2H: document.getElementById("mace-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("mace-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("mace-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("mace-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("mace-2H-heavy-swings-text")
    };

    var morningStar =
    {
        strReq: 11,
        dexReq: 0,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 25,
        lightStamina2H: 38,
        heavyStamina1H1: 50,
        heavyStamina1H2: 50,
        heavyStamina2H1: 68,
        heavyStamina2H2: 68,
        id1H: document.getElementById("morning-star-1H-wieldable-text"),
        id2H: document.getElementById("morning-star-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("morning-star-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("morning-star-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("morning-star-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("morning-star-2H-heavy-swings-text")
    };

    var pickaxe =
    {
        strReq: 14,
        dexReq: 0,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 25,
        lightStamina2H: 38,
        heavyStamina1H1: 50,
        heavyStamina1H2: 50,
        heavyStamina2H1: 65,
        heavyStamina2H2: 65,
        id1H: document.getElementById("pickaxe-1H-wieldable-text"),
        id2H: document.getElementById("pickaxe-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("pickaxe-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("pickaxe-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("pickaxe-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("pickaxe-2H-heavy-swings-text")
    };

    var reinforcedClub =
    {
        strReq: 12,
        dexReq: 0,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 25,
        lightStamina2H: 38,
        heavyStamina1H1: 65,
        heavyStamina1H2: 45,
        heavyStamina2H1: 75,
        heavyStamina2H2: 55,
        id1H: document.getElementById("reinforced-club-1H-wieldable-text"),
        id2H: document.getElementById("reinforced-club-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("reinforced-club-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("reinforced-club-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("reinforced-club-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("reinforced-club-2H-heavy-swings-text")
    };

    var warpick =
    {
        strReq: 11,
        dexReq: 10,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 25,
        lightStamina2H: 38,
        heavyStamina1H1: 50,
        heavyStamina1H2: 50,
        heavyStamina2H1: 65,
        heavyStamina2H2: 65,
        id1H: document.getElementById("warpick-1H-wieldable-text"),
        id2H: document.getElementById("warpick-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("warpick-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("warpick-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("warpick-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("warpick-2H-heavy-swings-text")
    };

    var demonGreatHammer =
    {
        strReq: 46,
        dexReq: 0,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 35,
        lightStamina2H: 48,
        heavyStamina1H1: 74,
        heavyStamina1H2: 74,
        heavyStamina2H1: 85,
        heavyStamina2H2: 85,
        id1H: document.getElementById("demon's-great-hammer-1H-wieldable-text"),
        id2H: document.getElementById("demon's-great-hammer-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("demon's-great-hammer-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("demon's-great-hammer-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("demon's-great-hammer-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("demon's-great-hammer-2H-heavy-swings-text")
    };

    var dragonTooth =
    {
        strReq: 40,
        dexReq: 0,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 35,
        lightStamina2H: 48,
        heavyStamina1H1: 74,
        heavyStamina1H2: 74,
        heavyStamina2H1: 85,
        heavyStamina2H2: 85,
        id1H: document.getElementById("dragon-tooth-1H-wieldable-text"),
        id2H: document.getElementById("dragon-tooth-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("dragon-tooth-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("dragon-tooth-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("dragon-tooth-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("dragon-tooth-2H-heavy-swings-text")
    };

    var grant =
    {
        strReq: 50,
        dexReq: 0,
        intReq: 0,
        fthReq: 30,
        lightStamina1H: 35,
        lightStamina2H: 48,
        heavyStamina1H1: 74,
        heavyStamina1H2: 74,
        heavyStamina2H1: 1,
        heavyStamina2H2: 1,
        id1H: document.getElementById("grant-1H-wieldable-text"),
        id2H: document.getElementById("grant-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("grant-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("grant-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("grant-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("grant-2H-heavy-swings-text")
    };

    var greatClub =
    {
        strReq: 28,
        dexReq: 0,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 35,
        lightStamina2H: 48,
        heavyStamina1H1: 80,
        heavyStamina1H2: 80,
        heavyStamina2H1: 110,
        heavyStamina2H2: 110,
        id1H: document.getElementById("great-club-1H-wieldable-text"),
        id2H: document.getElementById("great-club-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("great-club-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("great-club-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("great-club-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("great-club-2H-heavy-swings-text")
    };

    var largeClub =
    {
        strReq: 26,
        dexReq: 0,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 35,
        lightStamina2H: 48,
        heavyStamina1H1: 65,
        heavyStamina1H2: 65,
        heavyStamina2H1: 105,
        heavyStamina2H2: 105,
        id1H: document.getElementById("large-club-1H-wieldable-text"),
        id2H: document.getElementById("large-club-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("large-club-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("large-club-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("large-club-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("large-club-2H-heavy-swings-text")
    };

    var smoughHammer =
    {
        strReq: 58,
        dexReq: 0,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 35,
        lightStamina2H: 48,
        heavyStamina1H1: 100,
        heavyStamina1H2: 100,
        heavyStamina2H1: 130,
        heavyStamina2H2: 130,
        id1H: document.getElementById("smough's-hammer-1H-wieldable-text"),
        id2H: document.getElementById("smough's-hammer-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("smough's-hammer-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("smough's-hammer-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("smough's-hammer-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("smough's-hammer-2H-heavy-swings-text")
    };

    var channelerTrident =
    {
        strReq: 16,
        dexReq: 16,
        intReq: 24,
        fthReq: 0,
        lightStamina1H: 25,
        lightStamina2H: 35,
        heavyStamina1H1: 60,
        heavyStamina1H2: 60,
        heavyStamina2H1: 1,
        heavyStamina2H2: 1,
        id1H: document.getElementById("channeler's-trident-1H-wieldable-text"),
        id2H: document.getElementById("channeler's-trident-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("channeler's-trident-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("channeler's-trident-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("channeler's-trident-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("channeler's-trident-2H-heavy-swings-text")
    };

    var demonSpear =
    {
        strReq: 12,
        dexReq: 10,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 25,
        lightStamina2H: 35,
        heavyStamina1H1: 100,
        heavyStamina1H2: 100,
        heavyStamina2H1: 120,
        heavyStamina2H2: 120,
        id1H: document.getElementById("demon's-spear-1H-wieldable-text"),
        id2H: document.getElementById("demon's-spear-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("demon's-spear-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("demon's-spear-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("demon's-spear-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("demon's-spear-2H-heavy-swings-text")
    };

    var dragonslayerSpear =
    {
        strReq: 24,
        dexReq: 24,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 25,
        lightStamina2H: 35,
        heavyStamina1H1: 72,
        heavyStamina1H2: 72,
        heavyStamina2H1: 65,
        heavyStamina2H2: 85,
        id1H: document.getElementById("dragonslayer-spear-1H-wieldable-text"),
        id2H: document.getElementById("dragonslayer-spear-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("dragonslayer-spear-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("dragonslayer-spear-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("dragonslayer-spear-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("dragonslayer-spear-2H-heavy-swings-text")
    };

    var fourProngedPlow =
    {
        strReq: 15,
        dexReq: 12,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 30,
        lightStamina2H: 42,
        heavyStamina1H1: 66,
        heavyStamina1H2: 66,
        heavyStamina2H1: 105,
        heavyStamina2H2: 105,
        id1H: document.getElementById("four-pronged-plow-1H-wieldable-text"),
        id2H: document.getElementById("four-pronged-plow-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("four-pronged-plow-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("four-pronged-plow-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("four-pronged-plow-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("four-pronged-plow-2H-heavy-swings-text")
    };

    var moonlightButterflyHorn =
    {
        strReq: 12,
        dexReq: 0,
        intReq: 14,
        fthReq: 0,
        lightStamina1H: 25,
        lightStamina2H: 35,
        heavyStamina1H1: 55,
        heavyStamina1H2: 55,
        heavyStamina2H1: 75,
        heavyStamina2H2: 75,
        id1H: document.getElementById("moonlight-butterfly-horn-1H-wieldable-text"),
        id2H: document.getElementById("moonlight-butterfly-horn-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("moonlight-butterfly-horn-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("moonlight-butterfly-horn-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("moonlight-butterfly-horn-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("moonlight-butterfly-horn-2H-heavy-swings-text")
    };

    var partizan =
    {
        strReq: 13,
        dexReq: 12,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 25,
        lightStamina2H: 35,
        heavyStamina1H1: 55,
        heavyStamina1H2: 55,
        heavyStamina2H1: 64,
        heavyStamina2H2: 64,
        id1H: document.getElementById("partizan-1H-wieldable-text"),
        id2H: document.getElementById("partizan-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("partizan-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("partizan-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("partizan-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("partizan-2H-heavy-swings-text")
    };

    var pike =
    {
        strReq: 24,
        dexReq: 10,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 30,
        lightStamina2H: 42,
        heavyStamina1H1: 75,
        heavyStamina1H2: 75,
        heavyStamina2H1: 90,
        heavyStamina2H2: 90,
        id1H: document.getElementById("pike-1H-wieldable-text"),
        id2H: document.getElementById("pike-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("pike-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("pike-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("pike-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("pike-2H-heavy-swings-text")
    };

    var silverKnightSpear =
    {
        strReq: 16,
        dexReq: 22,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 25,
        lightStamina2H: 35,
        heavyStamina1H1: 60,
        heavyStamina1H2: 60,
        heavyStamina2H1: 75,
        heavyStamina2H2: 75,
        id1H: document.getElementById("silver-knight-spear-1H-wieldable-text"),
        id2H: document.getElementById("silver-knight-spear-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("silver-knight-spear-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("silver-knight-spear-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("silver-knight-spear-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("silver-knight-spear-2H-heavy-swings-text")
    };

    var spear =
    {
        strReq: 11,
        dexReq: 10,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 25,
        lightStamina2H: 35,
        heavyStamina1H1: 55,
        heavyStamina1H2: 55,
        heavyStamina2H1: 75,
        heavyStamina2H2: 75,
        id1H: document.getElementById("spear-1H-wieldable-text"),
        id2H: document.getElementById("spear-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("spear-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("spear-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("spear-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("spear-2H-heavy-swings-text")
    };

    var wingedSpear =
    {
        strReq: 13,
        dexReq: 15,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 25,
        lightStamina2H: 35,
        heavyStamina1H1: 55,
        heavyStamina1H2: 55,
        heavyStamina2H1: 75,
        heavyStamina2H2: 75,
        id1H: document.getElementById("winged-spear-1H-wieldable-text"),
        id2H: document.getElementById("winged-spear-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("winged-spear-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("winged-spear-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("winged-spear-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("winged-spear-2H-heavy-swings-text")
    };

    var blackKnightHalberd =
    {
        strReq: 32,
        dexReq: 18,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 30,
        lightStamina2H: 40,
        heavyStamina1H1: 80,
        heavyStamina1H2: 80,
        heavyStamina2H1: 95,
        heavyStamina2H2: 95,
        id1H: document.getElementById("black-knight-halberd-1H-wieldable-text"),
        id2H: document.getElementById("black-knight-halberd-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("black-knight-halberd-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("black-knight-halberd-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("black-knight-halberd-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("black-knight-halberd-2H-heavy-swings-text")
    };

    var gargoyleHalberd =
    {
        strReq: 16,
        dexReq: 12,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 30,
        lightStamina2H: 40,
        heavyStamina1H1: 55,
        heavyStamina1H2: 55,
        heavyStamina2H1: 90,
        heavyStamina2H2: 90,
        id1H: document.getElementById("gargoyle's-halberd-1H-wieldable-text"),
        id2H: document.getElementById("gargoyle's-halberd-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("gargoyle's-halberd-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("gargoyle's-halberd-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("gargoyle's-halberd-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("gargoyle's-halberd-2H-heavy-swings-text")
    };
    
    var giantHalberd =
    {
        strReq: 36,
        dexReq: 12,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 30,
        lightStamina2H: 40,
        heavyStamina1H1: 60,
        heavyStamina1H2: 60,
        heavyStamina2H1: 77,
        heavyStamina2H2: 77,
        id1H: document.getElementById("giant's-halberd-1H-wieldable-text"),
        id2H: document.getElementById("giant's-halberd-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("giant's-halberd-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("giant's-halberd-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("giant's-halberd-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("giant's-halberd-2H-heavy-swings-text")
    };

    var greatScythe =
    {
        strReq: 14,
        dexReq: 14,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 30,
        lightStamina2H: 40,
        heavyStamina1H1: 55,
        heavyStamina1H2: 55,
        heavyStamina2H1: 72,
        heavyStamina2H2: 72,
        id1H: document.getElementById("great-scythe-1H-wieldable-text"),
        id2H: document.getElementById("great-scythe-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("great-scythe-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("great-scythe-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("great-scythe-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("great-scythe-2H-heavy-swings-text")
    };

    var halberd =
    {
        strReq: 16,
        dexReq: 12,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 30,
        lightStamina2H: 40,
        heavyStamina1H1: 55,
        heavyStamina1H2: 55,
        heavyStamina2H1: 90,
        heavyStamina2H2: 90,
        id1H: document.getElementById("halberd-1H-wieldable-text"),
        id2H: document.getElementById("halberd-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("halberd-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("halberd-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("halberd-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("halberd-2H-heavy-swings-text")
    };

    var lifehuntScythe =
    {
        strReq: 16,
        dexReq: 14,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 30,
        lightStamina2H: 40,
        heavyStamina1H1: 55,
        heavyStamina1H2: 55,
        heavyStamina2H1: 72,
        heavyStamina2H2: 72,
        id1H: document.getElementById("lifehunt-scythe-1H-wieldable-text"),
        id2H: document.getElementById("lifehunt-scythe-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("lifehunt-scythe-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("lifehunt-scythe-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("lifehunt-scythe-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("lifehunt-scythe-2H-heavy-swings-text")
    };

    var lucerne =
    {
        strReq: 15,
        dexReq: 12,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 30,
        lightStamina2H: 40,
        heavyStamina1H1: 55,
        heavyStamina1H2: 55,
        heavyStamina2H1: 90,
        heavyStamina2H2: 90,
        id1H: document.getElementById("lucerne-1H-wieldable-text"),
        id2H: document.getElementById("lucerne-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("lucerne-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("lucerne-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("lucerne-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("lucerne-2H-heavy-swings-text")
    };

    var scythe =
    {
        strReq: 14,
        dexReq: 12,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 30,
        lightStamina2H: 40,
        heavyStamina1H1: 55,
        heavyStamina1H2: 55,
        heavyStamina2H1: 90,
        heavyStamina2H2: 90,
        id1H: document.getElementById("scythe-1H-wieldable-text"),
        id2H: document.getElementById("scythe-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("scythe-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("scythe-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("scythe-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("scythe-2H-heavy-swings-text")
    };

    var titaniteCatchPole =
    {
        strReq: 16,
        dexReq: 14,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 30,
        lightStamina2H: 40,
        heavyStamina1H1: 95,
        heavyStamina1H2: 95,
        heavyStamina2H1: 110,
        heavyStamina2H2: 110,
        id1H: document.getElementById("titanite-catch-pole-1H-wieldable-text"),
        id2H: document.getElementById("titanite-catch-pole-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("titanite-catch-pole-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("titanite-catch-pole-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("titanite-catch-pole-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("titanite-catch-pole-2H-heavy-swings-text")
    };
 
    var caestus =
    {
        strReq: 5,
        dexReq: 8,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 1,
        heavyStamina1H1: 40,
        heavyStamina1H2: 50,
        heavyStamina2H1: 1,
        heavyStamina2H2: 1,
        id1H: document.getElementById("caestus-1H-wieldable-text"),
        id2H: document.getElementById("caestus-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("caestus-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("caestus-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("caestus-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("caestus-2H-heavy-swings-text")
    };

    var claw =
    {
        strReq: 6,
        dexReq: 14,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 1,
        heavyStamina1H1: 40,
        heavyStamina1H2: 40,
        heavyStamina2H1: 1,
        heavyStamina2H2: 1,
        id1H: document.getElementById("claw-1H-wieldable-text"),
        id2H: document.getElementById("claw-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("claw-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("claw-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("claw-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("claw-2H-heavy-swings-text")
    };

    var darkHand =
    {
        strReq: 0,
        dexReq: 0,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 1,
        heavyStamina1H1: 20,
        heavyStamina1H2: 20,
        heavyStamina2H1: 1,
        heavyStamina2H2: 1,
        id1H: document.getElementById("dark-hand-1H-wieldable-text"),
        id2H: document.getElementById("dark-hand-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("dark-hand-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("dark-hand-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("dark-hand-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("dark-hand-2H-heavy-swings-text")
    };

    var dragonBoneFist =
    {
        strReq: 20,
        dexReq: 0,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 20,
        lightStamina2H: 1,
        heavyStamina1H1: 120,
        heavyStamina1H2: 120,
        heavyStamina2H1: 1,
        heavyStamina2H2: 1,
        id1H: document.getElementById("dragon-bone-fist-1H-wieldable-text"),
        id2H: document.getElementById("dragon-bone-fist-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("dragon-bone-fist-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("dragon-bone-fist-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("dragon-bone-fist-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("dragon-bone-fist-2H-heavy-swings-text")
    };

    var guardianTail =
    {
        strReq: 15,
        dexReq: 10,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 25,
        lightStamina2H: 35,
        heavyStamina1H1: 35,
        heavyStamina1H2: 40,
        heavyStamina2H1: 55,
        heavyStamina2H2: 55,
        id1H: document.getElementById("guardian-tail-1H-wieldable-text"),
        id2H: document.getElementById("guardian-tail-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("guardian-tail-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("guardian-tail-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("guardian-tail-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("guardian-tail-2H-heavy-swings-text")
    };

    var notchedWhip =
    {
        strReq: 8,
        dexReq: 16,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 25,
        lightStamina2H: 35,
        heavyStamina1H1: 35,
        heavyStamina1H2: 40,
        heavyStamina2H1: 55,
        heavyStamina2H2: 55,
        id1H: document.getElementById("notched-whip-1H-wieldable-text"),
        id2H: document.getElementById("notched-whip-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("notched-whip-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("notched-whip-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("notched-whip-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("notched-whip-2H-heavy-swings-text")
    };

    var whip =
    {
        strReq: 7,
        dexReq: 14,
        intReq: 0,
        fthReq: 0,
        lightStamina1H: 25,
        lightStamina2H: 35,
        heavyStamina1H1: 35,
        heavyStamina1H2: 40,
        heavyStamina2H1: 55,
        heavyStamina2H2: 55,
        id1H: document.getElementById("whip-1H-wieldable-text"),
        id2H: document.getElementById("whip-2H-wieldable-text"),
        idLightStamina1H: document.getElementById("whip-1H-light-swings-text"),
        idLightStamina2H: document.getElementById("whip-2H-light-swings-text"),
        idHeavyStamina1H: document.getElementById("whip-1H-heavy-swings-text"),
        idHeavyStamina2H: document.getElementById("whip-2H-heavy-swings-text")
    };

    //Create an array to put all weapons in.
    return weapons = [dagger, banditKnife, darkSilverTracer, ghostBlade, parryingDagger, priscillaDagger, astoraStraightSword, balderSideSword,
                      barbedStraightSword, broadsword, brokenStraightSword, crystalStraightSword, darkSword, drakeSword, longsword, shortsword,
                      silverKnightStraightSword, straightSwordHilt, sunlightStraightSword, abyssGreatsword, bastardSword, blackKnightSword,
                      claymore, crystalGreatsword, flamberge, greatLordGreatsword, greatswordOfArtorias, greatswordOfArtoriasCursed,
                      manSerpentGreatsword, moonlightGreatsword, obsidianGreatsword, stoneGreatsword, blackKnightGreatsword, demonGreatMachete,
                      dragonGreatsword, greatsword, zweihander, falchion, goldTracer, jaggedGhostBlade, paintingGuardianSword, quelaagFurySword,
                      scimitar, shotel, gravelordSword, murakumo, server, chaosBlade, iaito, uchigatana, washingPole, estoc, mailBreaker, rapier,
                      ricardRapier, velkaRapier, battleAxe, butcherKnife, crescentAxe, gargoyleTailAxe, golemAxe, handAxe, blackKnightGreataxe,
                      demonGreataxe, dragonKingGreataxe, greataxe, stoneGreataxe, blacksmithGiantHammer, blacksmithHammer, hammerOfVamos,
                      club, mace, morningStar, pickaxe, reinforcedClub, warpick, demonGreatHammer, dragonTooth, grant, greatClub, largeClub,
                      smoughHammer, channelerTrident, demonSpear, dragonslayerSpear, fourProngedPlow, moonlightButterflyHorn, partizan, pike,
                      silverKnightSpear, spear, wingedSpear, blackKnightHalberd, gargoyleHalberd, giantHalberd, greatScythe, halberd, lifehuntScythe,
                      lucerne, scythe, titaniteCatchPole, caestus, claw, darkHand, dragonBoneFist, guardianTail, notchedWhip, whip];
}

// To prevent the message "Confirm Form Resubmission" from appearing on refresh.
/*
if ( window.history.replaceState )
{
    window.history.replaceState( null, null, window.location.href );
}
*/