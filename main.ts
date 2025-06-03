namespace SpriteKind {
    export const AIM = SpriteKind.create()
}
function Shoot_Projectile2 () {
    let boss: Sprite = null
    if (Math.percentChance(5)) {
        for (let index = 0; index < 5; index++) {
            BossProjectile = sprites.create(assets.image`Tracker Attack`, SpriteKind.Player)
            BossProjectile.setFlag(SpriteFlag.GhostThroughWalls, true)
            BossProjectile.setFlag(SpriteFlag.AutoDestroy, true)
            BossProjectile.setPosition(boss.x, boss.y)
            BossProjectile.setVelocity(randint(-100, 100), randint(-100, 100))
            timer.after(500, function () {
                for (let value of sprites.allOfKind(SpriteKind.Player)) {
                    value.follow(movementHitbox, 75)
                }
            })
        }
    } else {
        for (let index = 0; index < 5; index++) {
            BossProjectile = sprites.create(assets.image`basic Attack`, SpriteKind.Player)
            BossProjectile.setFlag(SpriteFlag.GhostThroughWalls, true)
            BossProjectile.setFlag(SpriteFlag.AutoDestroy, true)
            BossProjectile.setPosition(boss.x, boss.y)
            BossProjectile.setVelocity(randint(-100, 100), randint(-100, 100))
            timer.after(500, function () {
                for (let value2 of sprites.allOfKind(SpriteKind.Player)) {
                    spriteutils.setVelocityAtAngle(value2, spriteutils.angleFrom(value2, movementHitbox), randint(200, 300))
                }
            })
        }
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    proj = darts.create(img`
        . . . . . . . . 
        . . 6 6 6 6 . . 
        . 6 6 6 6 6 6 . 
        . 6 6 6 6 6 6 . 
        . 6 6 6 6 6 6 . 
        . 6 6 6 6 6 6 . 
        . . 6 6 6 6 . . 
        . . . . . . . . 
        `, SpriteKind.Projectile, movementHitbox.x, movementHitbox.y)
    proj.angle = 0 - Math.abs(degrees)
    proj.pow = 150
    proj.gravity = 0
    proj.throwDart()
})
function next_level () {
    tiles.setCurrentTilemap(levels[currentLevel])
    tiles.placeOnRandomTile(movementHitbox, assets.tile`end2`)
    tiles.placeOnRandomTile(charlook, assets.tile`end2`)
}
function clear () {
    for (let value of sprites.allOfKind(SpriteKind.Projectile)) {
        sprites.destroy(value)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`end`, function (sprite, location) {
    clear()
    currentLevel += 1
    next_level()
})
function degree_to_radian (deg: number) {
    return Math.PI / 180 * deg
}
sprites.onDestroyed(SpriteKind.Projectile, function (sprite) {
    Projectilesused += 1
})
let currentLevel = 0
let degrees = 0
let proj: Dart = null
let BossProjectile: Sprite = null
let levels: tiles.TileMapData[] = []
let movementHitbox: Sprite = null
let charlook: Sprite = null
charlook = sprites.create(assets.image`char`, SpriteKind.Player)
movementHitbox = sprites.create(img`
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . 3 3 3 3 . . . 
    . . . 3 3 3 3 . . . 
    . . . 3 3 3 3 . . . 
    . . . 3 3 3 3 . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    . . . . . . . . . . 
    `, SpriteKind.Player)
charlook.setFlag(SpriteFlag.Ghost, true)
scene.cameraFollowSprite(movementHitbox)
scene.setBackgroundImage(assets.image`background2`)
levels = [
tilemap`level1`,
tilemap`level2`,
tilemap`level3`,
tilemap`level4`,
tilemap`level6`,
tilemap`level5`,
tilemap`level8`,
tilemap`level7`,
tilemap`level9`
]
next_level()
let switchlevel = true
let radius = 20
let aim_sensitivity = 3
movementHitbox.z = 2
movementHitbox.setStayInScreen(true)
controller.moveSprite(movementHitbox, 150, 150)
let aim = sprites.create(img`
    . . . . . . . . 
    . . . 1 1 . . . 
    . . 1 1 1 1 . . 
    . 1 1 2 2 1 1 . 
    . 1 1 2 2 1 1 . 
    . . 1 1 1 1 . . 
    . . . 1 1 . . . 
    . . . . . . . . 
    `, SpriteKind.AIM)
let Projectilesused = 0
aim.z = 1
let playerHealth = statusbars.create(20, 4, StatusBarKind.Health)
playerHealth.max = 50
playerHealth.value = 50
playerHealth.attachToSprite(charlook, -20, 0)
game.onUpdate(function () {
    if (browserEvents.J.isPressed()) {
        degrees += 0 - aim_sensitivity * 1
    }
    if (browserEvents.L.isPressed()) {
        degrees += aim_sensitivity * 1
    }
    if (degrees < 0) {
        degrees = 359
    } else if (degrees > 359) {
        degrees = 0
    }
    aim.x = movementHitbox.x + radius * Math.cos(degree_to_radian(degrees))
    aim.y = movementHitbox.y + radius * Math.sin(degree_to_radian(degrees))
})
forever(function () {
    charlook.setPosition(movementHitbox.x, movementHitbox.y)
})
