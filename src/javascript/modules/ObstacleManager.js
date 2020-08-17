class ObstacleManager {
    constructor(obstaclesContainers) {
        this._obstaclesContainers = obstaclesContainers;
    }

    getFakeObstaclesBounds() {
        let obstaclesBounds = [];

        for (let i = 0; i < this._obstaclesContainers.length; i++) {
            const element = this._obstaclesContainers[i];
            obstaclesBounds.push(element.getFakeObstacleBounds());
        }

        return obstaclesBounds;
    }

    start() {
        for (let i = 0; i < this._obstaclesContainers.length; i++) {
            const element = this._obstaclesContainers[i];
            element.start();
        } 
    }

    resize() {
        for (let i = 0; i < this._obstaclesContainers.length; i++) {
            const element = this._obstaclesContainers[i];
            element.resize();
        }
    }

    draw(container) {
        for (let i = 0; i < this._obstaclesContainers.length; i++) {
            const element = this._obstaclesContainers[i];
            container.addChild(element.drawObstacles());
        }
    }

    drawFakeObstacles(container) {
        for (let i = 0; i < this._obstaclesContainers.length; i++) {
            const element = this._obstaclesContainers[i];
            container.addChild(element.drawFakeObstacle());
        }
    }
    
    remove(container) {
        for (let i = 0; i < this._obstaclesContainers.length; i++) {
            const element = this._obstaclesContainers[i];
            container.removeChild(element.drawObstacles());
        }
    }

    removeFakeObstacles(container) {
        for (let i = 0; i < this._obstaclesContainers.length; i++) {
            const element = this._obstaclesContainers[i];
            container.removeChild(element.drawFakeObstacle());
        }
    }

    updateObstaclesPosition(speed, deltaTime) {
        for (let i = 0; i < this._obstaclesContainers.length; i++) {
            const element = this._obstaclesContainers[i];
            element.updateObstaclesPosition(speed, deltaTime);
        }
    }
}

export default ObstacleManager;