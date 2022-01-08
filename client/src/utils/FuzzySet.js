export default class FuzzySet {
    constructor(peakPoint,leftOffset,rightOffset) {
        this.peakPoint = peakPoint;
        this.leftOffset = leftOffset;
        this.rightOffset = rightOffset;
    }

    triangularDom(value){
        if(value <= this.peakPoint && value>= this.peakPoint - this.leftOffset){
            let gradient = 1.0 / this.leftOffset;
            return gradient * (value - (this.peakPoint - this.leftOffset));
        }

        else if(value > this.peakPoint && value < this.peakPoint + this.rightOffset){

            let gradient = -1.0 / this.rightOffset;
            return gradient * (value - this.peakPoint) + 1.0;
        }
        else return 0;
    }

    leftShoulderDom(value){
        if(value >= this.peakPoint && value < this.peakPoint + this.rightOffset){
            let gradient = (1.00 / this.rightOffset);
            return gradient * ((this.peakPoint + this.rightOffset) - value );
        }

        else if(value < this.peakPoint){
            return 1.00;
        }
        else return 0;
    }

    rightShoulderDom(value){
        if(value <= this.peakPoint && value > this.peakPoint - this.leftOffset){
            let gradient = 1.00 / this.leftOffset;
            return gradient * (value - (this.peakPoint - this.leftOffset));
        }

        else if(value > this.peakPoint){
            return 1.00;
        }
        else return 0;
    }

}