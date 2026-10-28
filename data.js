(function () {
  const games = [
    { slug: "genshin-impact", name: "Genshin Impact", genre: "Open-world RPG", platform: "PC · Mobile · PS5", color: "#77d6ba", initials: "GI", popular: true },
    { slug: "honkai-star-rail", name: "Honkai: Star Rail", genre: "Turn-based RPG", platform: "PC · Mobile · PS5", color: "#d89aff", initials: "HSR", popular: true },
    { slug: "raid-shadow-legends", name: "RAID: Shadow Legends", genre: "Fantasy RPG", platform: "PC · Mobile", color: "#e9aa62", initials: "RAID", popular: true, officialUrl: "https://raidshadowlegends.com/" },
    { slug: "roblox", name: "Roblox", genre: "Gaming platform", platform: "PC · Mobile · Console", color: "#ff7272", initials: "R", popular: true },
    { slug: "whiteout-survival", name: "Whiteout Survival", genre: "Survival strategy", platform: "Mobile · PC", color: "#87c9e8", initials: "WS", popular: true },
    { slug: "rise-of-kingdoms", name: "Rise of Kingdoms", genre: "Strategy MMO", platform: "Mobile · PC", color: "#e3b777", initials: "RoK", popular: true },
    { slug: "afk-journey", name: "AFK Journey", genre: "Fantasy RPG", platform: "PC · Mobile", color: "#91d7a4", initials: "AFK", popular: true },
    { slug: "zenless-zone-zero", name: "Zenless Zone Zero", genre: "Action RPG", platform: "PC · Mobile · PS5", color: "#ffbe6e", initials: "ZZZ" },
    { slug: "wuthering-waves", name: "Wuthering Waves", genre: "Open-world RPG", platform: "PC · Mobile · PS5", color: "#6ac9dc", initials: "WW" },
    { slug: "lords-mobile", name: "Lords Mobile", genre: "Strategy MMO", platform: "Mobile · PC", color: "#c595e8", initials: "LM" },
    { slug: "state-of-survival", name: "State of Survival", genre: "Survival strategy", platform: "Mobile · PC", color: "#eb8074", initials: "SoS" },
    { slug: "mobile-legends", name: "Mobile Legends: Bang Bang", genre: "MOBA", platform: "Mobile", color: "#8eb4ff", initials: "ML" },
    { slug: "summoners-war", name: "Summoners War", genre: "Fantasy RPG", platform: "Mobile · PC", color: "#cf8ee5", initials: "SW" },
    { slug: "pokemon-go", name: "Pokémon GO", genre: "Location-based RPG", platform: "Mobile", color: "#f0d26c", initials: "GO" },
    { slug: "call-of-duty-mobile", name: "Call of Duty: Mobile", genre: "Action shooter", platform: "Mobile", color: "#b7c37a", initials: "COD" },
    { slug: "clash-of-clans", name: "Clash of Clans", genre: "Strategy", platform: "Mobile", color: "#eaa365", initials: "CoC" },
    { slug: "clash-royale", name: "Clash Royale", genre: "Strategy", platform: "Mobile", color: "#86baff", initials: "CR" },
    { slug: "honkai-impact-3rd", name: "Honkai Impact 3rd", genre: "Action RPG", platform: "PC · Mobile", color: "#e39bb8", initials: "HI3" },
    { slug: "dislyte", name: "Dislyte", genre: "Turn-based RPG", platform: "PC · Mobile", color: "#b29aff", initials: "D" },
    { slug: "evony", name: "Evony: The King's Return", genre: "Strategy MMO", platform: "Mobile · PC", color: "#dcb576", initials: "E" }
  ];

  const codeSets = {
    "genshin-impact": [
      { code: "DEMO-PRIMOGEM-26", reward: "Sample reward — replace with a verified offer", status: "new", type: "sample" },
      { code: "DEMO-ADVENTURE-26", reward: "Sample reward — replace with a verified offer", status: "active", type: "sample" },
      { code: "DEMO-NEW-PLAYER", reward: "Illustrative new-player offer", status: "active", type: "new-only" },
      { code: "DEMO-EXPIRED-01", reward: "Expired sample entry", status: "expired", type: "sample" }
    ],
    "honkai-star-rail": [
      { code: "DEMO-TRAILBLAZE-26", reward: "Sample reward — replace with a verified offer", status: "new", type: "sample" },
      { code: "DEMO-EXPRESS-26", reward: "Sample reward — replace with a verified offer", status: "active", type: "sample" },
      { code: "DEMO-EXPIRED-02", reward: "Expired sample entry", status: "expired", type: "sample" }
    ],
    "raid-shadow-legends": [
      { code: "DEMO-CHAMPION-26", reward: "Sample reward — replace with a verified offer", status: "new", type: "sample" },
      { code: "DEMO-ARENA-26", reward: "Sample reward — replace with a verified offer", status: "active", type: "sample" },
      { code: "DEMO-EXPIRED-03", reward: "Expired sample entry", status: "expired", type: "sample" }
    ],
    "whiteout-survival": [
      { code: "DEMO-SURVIVOR-26", reward: "Sample reward — replace with a verified offer", status: "new", type: "sample" },
      { code: "DEMO-WINTER-26", reward: "Sample reward — replace with a verified offer", status: "active", type: "sample" },
      { code: "DEMO-EXPIRED-04", reward: "Expired sample entry", status: "expired", type: "sample" }
    ]
  };

  const articleData = [
    {
      slug: "genshin-impact-beginner-guide",
      title: "Genshin Impact Beginner Guide: Your First Steps in Teyvat",
      category: "Beginner Guides",
      game: "genshin-impact",
      readTime: "8 min read",
      excerpt: "A practical, spoiler-light roadmap for new Travelers: exploration, progression, team building, and spending your early resources wisely.",
      intro: "Starting a large open-world RPG can feel like being handed a map, a quest log, and a dozen currencies all at once. This guide gives new Travelers a calm, flexible order of operations. It focuses on understanding the systems rather than chasing a particular character or following a rigid checklist.",
      sections: [
        ["Begin with the story and the map", "Follow the main Archon quests when they are available. They introduce the regions, characters, and systems that make later activities easier to understand. Between story chapters, explore nearby terrain, activate Teleport Waypoints and Statues of The Seven, and collect resources you naturally encounter. There is no need to clear every icon the moment it appears. A little exploration alongside the story keeps travel convenient without turning the map into a chore.", "Treat each new region as a place to learn. Notice elemental puzzles, local specialties, and enemy types, and save a few useful map markers for resources you want to revisit. If a puzzle is unclear, change party members or return after unlocking more abilities; most early obstacles are designed to teach a mechanic, not test perfect execution."],
        ["Build a dependable early team", "A useful early party covers several jobs: a main damage dealer, a character who applies an element consistently, a support or buffer, and a source of healing or protection. These roles can overlap, and free characters can complete a great deal of the early game. Try reactions and observe what works before investing heavily. Character synergy and comfortable play are more valuable than copying an endgame ranking without the equipment or roster that ranking assumes.", "Level a small group first. Improving a handful of characters and their weapons makes story encounters smoother than spreading every material across the full roster. Upgrade talents when the game unlocks them, and use artifacts you find naturally. Early equipment is temporary; save rare enhancement materials until you understand which characters you enjoy."],
        ["Spend resources with a plan", "The game uses several currencies and wish banners, so read each banner's details before spending. Decide whether you are saving for a character you genuinely want or simply exploring the system. Avoid spending premium currency impulsively because a timer is visible. Events, exploration, quests, and routine play can all contribute rewards, but their availability and amounts change over time.", "Do not feel pressured by tier lists or limited-time countdowns. A ranking describes performance in a particular context; it cannot tell you whether a character's play style will be fun for you. Keep a simple note of your goals and check the in-game wish history and rules when you need clarity."],
        ["Make daily play sustainable", "Once daily commissions and resin are available, think of them as optional short sessions rather than obligations. Spend resin on materials that support your current team, and check the in-game descriptions before farming a domain. Events often introduce temporary activities; prioritize the rewards that matter to you and remember that some activities have story or Adventure Rank prerequisites.", "For a new account, progress comes from consistent, low-pressure play. If you have only a few minutes, complete one useful task and stop. If you have more time, explore or continue the story. There is no need to buy an account, use unofficial tools, or share login details to keep up."],
        ["A simple first-week checklist", "Unlock convenient travel points, finish the story quests that are currently open, and strengthen your preferred four-character party. Learn how elemental reactions work by testing them against ordinary enemies. Check event and mail pages for current official rewards, and verify any third-party code against the publisher's official channels before entering it. Promo codes can expire, be region-limited, or have account requirements.", "When you are ready for a deeper challenge, revisit this plan with your own roster in mind. The best next step is usually the one that makes a character you like more effective or opens an activity you are curious about. Enjoying the world is a valid form of progress."]
      ]
    },
    {
      slug: "genshin-impact-character-tier-list",
      title: "How to Read a Genshin Impact Character Tier List",
      category: "Tier Lists",
      game: "genshin-impact",
      readTime: "7 min read",
      excerpt: "Understand what a ranking can tell you, what it leaves out, and how to choose characters that fit your own account.",
      intro: "A tier list is a shorthand for comparing options, not a rulebook for how to play. Rankings depend on teams, equipment, investment, encounter design, and the author's assumptions. Use this framework to evaluate recommendations without feeling that a favorite character is a mistake.",
      sections: [
        ["Start with the assumptions", "Before trusting a ranking, look for its date, game version, investment level, and target content. A list built around fully equipped endgame teams may not describe a new account. One focused on a single difficult encounter may undervalue characters who are excellent in exploration or flexible teams. If the author does not state assumptions, treat the placement as an opinion rather than a universal result.", "Version updates can change enemy lineups and introduce new characters or mechanics. This does not make every older guide useless, but it does mean that a tier list should explain what has changed and why. A dated ranking is a snapshot, not a permanent property of a character."],
        ["Compare roles, not just positions", "A damage dealer, healer, buffer, and elemental enabler solve different problems. Ranking all of them on one vertical scale hides the fact that a support can improve a team more than a second damage dealer. Ask what role your party needs, how often a character can contribute, and whether their abilities work well together.", "A character's value also depends on the roster around them. A specialized unit may look modest alone but become excellent with teammates who enable their mechanics. Conversely, a high-ranked damage dealer may feel awkward without the right support or energy generation."],
        ["Consider practical investment", "Some rankings assume rare weapons, ideal artifact sets, or extensive talent investment. For a realistic comparison, ask how the character performs with equipment you can obtain and maintain. Ease of use matters too: a slightly lower theoretical ceiling can be a better fit if the rotation is comfortable and reliable.", "Resource planning is part of team building. Focus upgrades on the characters you actually field, and avoid spending scarce materials solely because a chart assigns a high grade. You can experiment with temporary equipment before making a long-term investment."],
        ["Make the list serve your account", "Use rankings to discover options and learn why a character works. Then test the character in a trial or low-pressure activity, consider the teammates you own, and decide whether the play style appeals to you. Exploration, story, and routine challenges may reward different strengths than a speed-focused endgame ranking.", "The most useful tier list is transparent about evidence and limitations. Look for explanations, sample teams, alternatives, and updates. If you disagree with a placement, compare the stated assumptions to your own goals instead of treating the number as a verdict."]
      ]
    },
    {
      slug: "honkai-star-rail-beginner-guide",
      title: "Honkai: Star Rail Beginner Guide for New Trailblazers",
      category: "Beginner Guides",
      game: "honkai-star-rail",
      readTime: "8 min read",
      excerpt: "Learn the basics of Trailblaze progression, team roles, equipment, and how to make steady progress without wasting materials.",
      intro: "A new Trailblazer meets a story, a turn-based battle system, several progression tracks, and a growing list of activities. The good news is that the early journey teaches these systems gradually. Use this guide to build a simple routine and avoid investing in every new option at once.",
      sections: [
        ["Follow the Trailblaze story", "The main story introduces locations, characters, and major systems in a useful order. Complete available Trailblaze missions and unlock the services they introduce before worrying about endgame modes. Side missions are a good way to learn more about the setting, but you can save them for when you want a break from the main plot.", "Explore each hub and check for activities you have unlocked. The journal and in-game tutorials explain new mechanics, while the map helps you track destinations. If a mission is locked behind a level requirement, complete available objectives rather than trying to rush a single activity."],
        ["Understand team jobs and combat", "Teams are built around damage, survivability, and breaking enemy weaknesses. Pay attention to enemy toughness bars and the elements listed in their details. Breaking toughness can delay or disrupt an enemy, so matching elements can be useful even when a character is not your primary damage dealer. A sustain character can keep a team stable while supports improve damage or action efficiency.", "Skill points create a simple turn-by-turn resource puzzle. Some characters use a skill frequently while others can contribute with basic attacks. Try a rotation that maintains skill points and watch how each ability changes the next turn. You do not need a perfect rotation to learn the fundamentals."],
        ["Invest in a focused roster", "Choose a compact group that covers the content you are playing. Level characters and Light Cones you use regularly, and improve traces as their materials become available. Relics are an important long-term system, but early pieces are replaced often. Use reasonable temporary sets rather than spending all your stamina chasing perfect substats before your account is ready.", "The game's difficulty and available roster evolve as you progress. A guide written for a later level may assume characters, relics, or modes you have not unlocked. Use it for concepts, then adapt the details to your current stage."],
        ["Manage pulls and daily resources", "Read the rules on each warp banner and decide what would help your account before spending premium currency. Avoid treating every limited banner as a must-pull. A character's value depends on your current roster, preferred play style, and the teams you want to build. Keep resources for characters you genuinely want rather than reacting to every countdown.", "Spend Trailblaze Power on materials that support your current goals. Check the in-game activity descriptions and event requirements, which can change between updates. Official in-game announcements are the best source for current rewards and dates."],
        ["Build a routine that fits your time", "A short session can be enough to complete a daily objective or use some available resources. Longer sessions can focus on story, exploration, or a mode you enjoy. There is no need to play every activity as soon as it unlocks. If a challenge feels difficult, improve a few key levels and traces, check enemy weaknesses, and try a different team arrangement.", "For codes or promotions, verify the source and expiration directly with the publisher. Third-party lists can be outdated, and eligibility can vary. Never share your account credentials or install unofficial tools in exchange for claimed rewards."]
      ]
    },
    {
      slug: "honkai-star-rail-tier-list-guide",
      title: "Honkai: Star Rail Tier List Guide: Build for Your Team",
      category: "Tier Lists",
      game: "honkai-star-rail",
      readTime: "7 min read",
      excerpt: "A practical way to evaluate character rankings across teams, combat roles, and different stages of account progression.",
      intro: "Character rankings are useful when they explain their reasoning. They are less helpful when a single letter grade is presented as the answer for every account. This guide shows how to read rankings in context and use them to make decisions that suit your own Trailblazer journey.",
      sections: [
        ["Check version and content context", "A ranking should tell you when it was updated and what activities it evaluates. Enemy weaknesses, encounter mechanics, and available teammates can affect how a character performs. A unit that excels in one mode may be less important in another. If a list does not state its scope, use it as a broad discussion rather than a precise forecast.", "When comparing two guides, note whether they assume similar levels, traces, Light Cones, and relic quality. Different assumptions can produce different placements without either author necessarily being mistaken."],
        ["Balance damage and sustain", "Teams need to survive as well as deal damage. Defensive or healing characters can enable more aggressive choices elsewhere, while support abilities may improve the whole party. Consider the team's complete action economy and weaknesses instead of comparing individual damage numbers in isolation.", "A team with complementary roles can be more reliable than four individually popular characters. Examine how abilities interact and whether the team's resources and turns fit together."],
        ["Think about investment and flexibility", "Some characters need specific teammates or substantial investment to reach their strongest performance. Others are flexible and can fill a role in multiple teams. For a developing account, flexibility and comfort can be as valuable as peak output. Ask whether you have the resources and roster needed to reproduce a guide's example.", "Upgrade characters you use regularly, then expand when a new activity or team goal gives you a reason. Relic optimization can absorb a great deal of time, so prioritize meaningful improvements over endless farming for tiny gains."],
        ["Use rankings as research, not orders", "A tier list can introduce you to mechanics, team ideas, and useful alternatives. Try characters in trials where available, read ability descriptions, and decide whether their play style is enjoyable. Your account's needs are specific; a ranking cannot know which characters you own or what content you want to play.", "Good rankings show sample teams and explain uncertainty. Favor authors who update their work, distinguish roles, and say when a recommendation depends on special equipment. Treat unexplained grades as a starting point for questions, not a reason to spend."]
      ]
    },
    {
      slug: "raid-shadow-legends-beginner-guide",
      title: "RAID: Shadow Legends Beginner Guide: Build a Strong Start",
      category: "Beginner Guides",
      game: "raid-shadow-legends",
      readTime: "8 min read",
      excerpt: "A measured early-game plan for campaign progression, champion development, gear, and making your first teams.",
      intro: "RAID has a broad roster and many upgrade systems, which can make early choices feel permanent. They are not. A focused first team, careful use of upgrade materials, and a steady campaign routine can give a new account a solid foundation without chasing every promotion or ranking.",
      sections: [
        ["Progress through campaign", "Campaign stages introduce combat and provide a repeatable source of experience and basic equipment. Push as far as your team can manage, then farm a stage you can clear consistently. Completing missions and challenges can also guide you through features in a sensible order.", "Pay attention to affinity and enemy composition. When a stage stalls, upgrade your main champion's level and equipment before making many unrelated investments. A reliable farmer can make later development much faster."],
        ["Choose a core group", "Build a small set of champions with complementary jobs: damage, support, healing or protection, and utility. Early progression does not require a perfect legendary roster. Read skills carefully and notice how debuffs, buffs, and turn meter effects interact. Champions that help the team survive can be just as important as those that deal direct damage.", "Before ranking up a new champion, think about whether they fill a role your team lacks. Keep useful options until you understand their strengths, but avoid putting expensive upgrades into every champion at once."],
        ["Use gear and resources thoughtfully", "Equip the best pieces you have and prioritize useful main stats for each champion's role. Early gear is a stepping stone, so improve it enough to progress but do not assume every piece deserves maximum investment. Sets can help, though a useful individual stat can matter more than completing a set at any cost.", "Currencies and energy are limited by play time and account progression. Check event rules before participating and spend resources on goals you have chosen. Promotional offers and starter packs vary; verify current details in the official game before making a purchase."],
        ["Learn the main modes gradually", "Campaign, dungeons, Arena, and clan activities each emphasize different team strengths. Unlock modes as you progress and approach them as opportunities to learn rather than a checklist to finish immediately. A team designed for campaign farming may need different speed, accuracy, or survivability for a boss.", "Read boss abilities and tune your team to the encounter. If an ability repeatedly defeats your group, identify whether the issue is survival, damage, or a specific mechanic before spending materials on broad upgrades."],
        ["Keep expectations realistic", "Tier lists and promo-code pages can help you discover options, but neither replaces checking the current game. Codes can expire, be region-limited, or require a new account. Confirm them through official channels and never provide your password to a rewards site. Consistent progress on a small number of useful champions is more dependable than trying to copy an endgame roster."]
      ]
    },
    {
      slug: "raid-shadow-legends-champion-tier-list",
      title: "RAID: Shadow Legends Champion Tier List: What Rankings Mean",
      category: "Tier Lists",
      game: "raid-shadow-legends",
      readTime: "7 min read",
      excerpt: "Evaluate champion ratings by content, team synergy, gear, and account stage before committing valuable resources.",
      intro: "A champion can be excellent in one encounter and ordinary in another. RAID rankings make the most sense when they describe a specific job, team, and stage of progression. Learn what to look for before using a tier list to guide your next upgrade.",
      sections: [
        ["Ask what content the rating covers", "Campaign farming, dungeon bosses, Arena, and clan encounters place different demands on a champion. Look for ratings separated by mode and explanations of the role being evaluated. A universal grade may hide important strengths or limitations.", "Updates can change the roster and the wider game. Check the date and compare a guide's recommendations with current ability descriptions. A champion's reputation can outlive the context in which it was earned."],
        ["Read abilities and team function", "Skills, cooldowns, buffs, debuffs, and affinity all affect a champion's usefulness. Consider whether an ability helps the entire team or only performs well under particular conditions. A support who improves consistency may be more valuable to your account than a higher-ranked damage dealer with no suitable teammates.", "Synergy is central: speed control, healing, protection, and damage can work together. Evaluate the full composition and its purpose rather than comparing isolated ratings."],
        ["Account for gear and progression", "A champion's performance depends on stats and equipment as well as rarity. A guide that assumes optimized gear may not reflect a new account. Look for accessible builds and ask how much accuracy, speed, or survivability the role requires.", "Invest gradually. Improve the champions who help you reach the next milestone, and avoid spending rare materials simply because a chart places someone near the top. Your roster and current bottleneck should guide the decision."],
        ["Use ratings to ask better questions", "Good rankings explain why a champion is recommended, list alternatives, and identify situations where the rating changes. Use that information to decide whether a champion solves a problem you actually have. Test ideas in lower-risk content before committing heavily.", "No ranking can account for your enjoyment or every account's roster. A champion you like and use consistently can be a better investment than a theoretical best choice that makes the game less fun."]
      ]
    },
    {
      slug: "whiteout-survival-beginner-guide",
      title: "Whiteout Survival Beginner Guide: A Steady Start",
      category: "Beginner Guides",
      game: "whiteout-survival",
      readTime: "7 min read",
      excerpt: "Get oriented with settlement growth, resource planning, alliance play, and a sustainable early-game routine.",
      intro: "Whiteout Survival combines settlement management, timed upgrades, and a social strategy game. New players benefit from understanding the order of progression and joining an active community, but there is no need to spend money or rush every timer to enjoy the game.",
      sections: [
        ["Understand your settlement priorities", "The furnace and its prerequisite buildings shape access to new progression milestones. Read upgrade requirements before committing resources and keep important production buildings reasonably close to your current needs. Construction queues and research can have different requirements, so plan around what is actually blocking your next goal.", "Claim available production and complete tasks when convenient. Timers are part of the strategy loop; use a session to start useful upgrades rather than staying online waiting for each one to finish."],
        ["Keep resources and survivors in balance", "Growth depends on resources, time, and the needs of your settlement. Check which materials your next upgrade requires and avoid spending everything on optional improvements when a key milestone is close. Progression menus can help you understand what becomes available next.", "The game may change rewards and event schedules. Rely on current in-game information rather than old screenshots or fixed schedules from a third-party guide."],
        ["Find a helpful alliance", "An active alliance can offer coordination, shared goals, and help with timers or events. Look for a group whose schedule and expectations fit your play style. Read event rules and communicate before committing to a group activity. A welcoming alliance is more useful than one whose demands make the game feel like work.", "Never share account credentials with alliance members or outside services. Use the game's own social and account tools, and check official support guidance if you need help securing your account."],
        ["Approach events without pressure", "Events can provide extra goals and rewards, but participation should fit your available time and resources. Check objectives before using speedups or premium currency. Decide in advance what reward is worth pursuing and stop when the cost no longer makes sense for you.", "Promotional codes and starter bundles are not permanent guarantees. Verify the reward, eligibility, and expiration in official channels before acting. Avoid offers that promise extraordinary bonuses in exchange for account access."],
        ["Create a sustainable routine", "A short visit can collect important resources, begin an upgrade, and check alliance activity. Longer sessions can focus on events or planning. If you return after a break, review your current objectives rather than trying to catch up with every missed event.", "The strongest beginning is a plan you can maintain. Focus on the next meaningful upgrade, learn how your alliance coordinates, and enjoy the settlement-building at your own pace."]
      ]
    },
    {
      slug: "whiteout-survival-tier-list-guide",
      title: "Whiteout Survival Hero Rankings: Choose by Role",
      category: "Tier Lists",
      game: "whiteout-survival",
      readTime: "6 min read",
      excerpt: "A role-first framework for assessing heroes, formation needs, and how changing events affect rankings.",
      intro: "Hero rankings in a strategy game are only useful when they explain the activity and assumptions behind each placement. Your formation, available upgrades, and current goals all matter. This guide helps you compare heroes without treating a static list as a universal answer.",
      sections: [
        ["Identify the activity first", "A hero useful for exploration or one game mode may not be the best fit for a different battle. Check whether a ranking refers to a specific event, formation, or progression stage. Lists that combine unrelated contexts can make strong niche heroes appear weaker than they are.", "The game's balance and event lineup can change. Prefer recently updated guides that explain changes and show the conditions behind their advice."],
        ["Compare jobs and formation synergy", "Think about what your formation needs: damage, durability, support, or a specific ability. A balanced team can outperform a collection of individually popular heroes. Read skill descriptions and consider how heroes support one another.", "When testing a change, adjust one part of the formation at a time. This makes it easier to see whether a new hero improved the result or whether another factor was responsible."],
        ["Consider investment and availability", "A high rating may assume rarity, level, equipment, or upgrades that your account does not have. Consider the resources required to reach that performance and whether an accessible alternative can do the job now.", "Focus on the heroes you use regularly. Resources invested in a coherent team can help you progress more than spreading upgrades across many untested options."],
        ["Keep your goals in view", "Rankings can point you toward interesting builds and roles, but your current bottleneck should determine your next step. If you need survival, do not choose solely by damage rankings. If you enjoy a particular hero, look for teammates and activities that make that choice work.", "Treat rankings as conversation starters. Verify current details in the game and use your own results to decide what belongs in your team."]
      ]
    },
    {
      slug: "roblox-beginner-guide",
      title: "Roblox Beginner Guide: Finding Experiences and Staying Safe",
      category: "Beginner Guides",
      game: "roblox",
      readTime: "7 min read",
      excerpt: "Explore the platform, understand experience-specific rewards, manage your account, and recognize unsafe reward claims.",
      intro: "Roblox is a platform with many independently created experiences, each with its own rules, rewards, and community. That variety is exciting, but it also means that a code or tip for one experience may not work in another. This guide covers how to explore responsibly and protect your account.",
      sections: [
        ["Browse with curiosity", "Use the platform's discovery tools to find experiences that match your interests, and check the experience description before joining. Ratings, updates, and community notes can help set expectations, but they are not a guarantee of quality. Try a few experiences and leave if something feels uncomfortable.", "Many experiences have their own progression and reward systems. Learn the controls and in-game guidance before following an external walkthrough. Codes are usually specific to one experience, not universal to the whole platform."],
        ["Check codes at the source", "A legitimate code is typically announced by the experience creator through official community or social channels and redeemed in the relevant experience. Read the instructions carefully: spelling, capitalization, expiration, and account requirements can matter.", "Never enter your password on a third-party code page or install a browser extension to claim a reward. Be skeptical of promises of free platform currency, especially when they ask you to complete surveys, share credentials, or visit unrelated sites."],
        ["Secure your account", "Use a unique password and enable the account security features available to you. Keep recovery information current and never share login codes. If you play on a shared device, sign out when you finish and avoid saving credentials where others can access them.", "If you think your account has been compromised, follow the platform's official recovery process. Do not trust strangers who claim they can recover an account for a fee or in exchange for access."],
        ["Spend and socialize thoughtfully", "Understand the price and terms of any purchase before confirming it. Talk with a parent or guardian if you are under the age where you manage purchases independently. Use platform privacy and communication settings that feel comfortable, and block or report behavior that breaks the rules.", "A good experience should not require you to reveal personal information. Keep real-world details private and use the platform's built-in reporting and safety tools when needed."],
        ["Make exploration your own", "Try experiences with different genres and play styles instead of assuming that the most popular one will be your favorite. Learn each game's mechanics, check creator updates, and treat outside guides as suggestions rather than authority.", "This page is a general platform guide, not an endorsement of any third-party reward or affiliate offer. Verify current details through official Roblox resources and the creator of the specific experience."]
      ]
    },
    {
      slug: "afk-journey-hero-tier-list-guide",
      title: "AFK Journey Hero Tier List Guide: Build for Your Team",
      category: "Tier Lists",
      game: "afk-journey",
      readTime: "7 min read",
      excerpt: "A role-first framework for comparing heroes, building teams, and understanding why rankings change with the content.",
      intro: "AFK Journey hero rankings are most useful when they explain a character's role, the team around them, and the activity being evaluated. A single grade cannot account for every formation or account. Use this framework to compare recommendations and decide whether a hero solves a problem you actually have.",
      sections: [
        ["Check the activity behind a ranking", "A hero may excel in one battle format and be less central in another. Before comparing placements, check the guide's date, target activity, and assumptions about account progression. Enemy lineups, battlefield rules, and available teammates can all change the result.", "A list without a stated scope is a broad opinion, not a universal ranking. Look for authors who explain what changed between updates and why that affects a hero's position."],
        ["Rank team roles, not just individual heroes", "Teams benefit from heroes who can withstand pressure, deal damage, and support the rest of the formation. Positioning and enemy abilities can change which roles matter most. Read hero skills and evaluate how they work together instead of comparing isolated ratings.", "A lower-ranked hero with a useful ability may fit your formation better than a highly rated hero with no synergy. A balanced team can be more reliable than several individually popular picks."],
        ["Account for investment and progression", "A tier list may assume upgrades, equipment, or account progress that you do not yet have. Consider whether its sample formation is achievable and how much investment is required before a recommendation performs as described.", "Focus on the heroes you field regularly. If a battle is difficult, identify whether your problem is survival, positioning, or damage before spending scarce resources on a new character."],
        ["Use rankings as research, not orders", "A ranking can introduce you to useful abilities and team ideas, but your current goals should guide your choices. Check whether a hero addresses the specific challenge you are working on, then try small formation changes and observe the results.", "Enjoyment matters too. Choose heroes and strategies that make you want to keep playing; use rankings to discover options, not to decide what you are allowed to enjoy."],
        ["Verify current details", "Game balance and available activities can change between updates. Check in-game descriptions and current official announcements when a guide discusses a time-sensitive feature, reward, or event.", "No tier list can account for every account. Treat precise placements as editorial judgments, look for transparent explanations, and adapt advice to the heroes and equipment you actually own."]
      ]
    }
  ];

  window.LOOTVAULT_DATA = { games, codeSets, articleData };
})();
