import { AnimatedStrokeEasing } from 'app/components/AnimatedStroke';

export const symbolsArray = [
  '→', // Opposite of '←'
  '➡', // Opposite of '⬅'
  '↝', // Opposite of '↜'
  '↦', // Opposite of '↤'
  '⇒', // Opposite of '⇐'
  '►', // Opposite of '◄'
  '»', // Opposite of '«'
  '↠', // Opposite of '↞'
  '˃', // Opposite of '˂'
  '↣', // Opposite of '↢'
  '⇉', // Opposite of '⇇'
  '⇛', // Opposite of '⇚'
  '⇝', // Opposite of '⇜'
  '⇢', // Opposite of '⇠'
  '⇥', // Opposite of '⇤'
  '⇨', // Opposite of '⇦'
  '⇾', // Opposite of '⇽'
  '⍈', // Opposite of '⍇'
  '⟶', // Opposite of '⟵'
  '⟹', // Opposite of '⟸'
  '⟼', // Opposite of '⟻'
  '⟾', // Opposite of '⟽'
  '⤃', // Opposite of '⤂'
  '⤅', // Opposite of '⤆'
  '⤍', // Opposite of '⤌'
  '⤏', // Opposite of '⤎'
  '⬰', // Opposite of '⬱'
  '⬲', // Opposite of '⬳'
  '⬶', // Opposite of '⬸'
  '⬸', // Opposite of '⬹'
  '⭢', // Opposite of '⭠'
];

export const easingSymbols = [
  { id: 0, symbol: '➝', easing: AnimatedStrokeEasing.linear, name: 'linear' },
  { id: 1, symbol: '⇌', easing: AnimatedStrokeEasing.ease, name: 'ease' },
  { id: 2, symbol: '⇒', easing: AnimatedStrokeEasing.quad, name: 'quad' },
  { id: 3, symbol: '⇢', easing: AnimatedStrokeEasing.cubic, name: 'cubic' },
  { id: 4, symbol: '↺', easing: AnimatedStrokeEasing.sin, name: 'sin' },
  { id: 5, symbol: '⭕', easing: AnimatedStrokeEasing.circle, name: 'circle' },
  { id: 6, symbol: '⤢', easing: AnimatedStrokeEasing.exp, name: 'exp' },
  { id: 7, symbol: '⤒', easing: AnimatedStrokeEasing.bounce, name: 'bounce' },
];
